-- First, let's add more detailed logging to the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_team_id uuid;
BEGIN
  -- Debug logging
  RAISE LOG 'handle_new_user() called with new user data: %', to_json(new);
  
  -- Check if user already exists
  IF EXISTS (SELECT 1 FROM public.users WHERE id = new.id) THEN
    RAISE LOG 'User already exists with id: %', new.id;
    RETURN new;
  END IF;

  -- Insert into public.users with error handling
  BEGIN
    INSERT INTO public.users (
      id,
      full_name,
      avatar_url,
      email
    )
    VALUES (
      new.id,
      COALESCE(new.raw_user_meta_data->>'full_name', ''),
      COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
      COALESCE(new.email, '')
    );
    RAISE LOG 'Successfully inserted user with id: %', new.id;
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error inserting user: % %', SQLERRM, SQLSTATE;
    RETURN new;
  END;

  -- Insert into public.teams with error handling
  BEGIN
    INSERT INTO public.teams (
      email,
      inbox_email
    )
    VALUES (
      COALESCE(new.email, ''),
      COALESCE(new.email, '')
    )
    RETURNING id INTO new_team_id;
    RAISE LOG 'Successfully created team with id: %', new_team_id;
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error creating team: % %', SQLERRM, SQLSTATE;
    RETURN new;
  END;

  -- Insert into public.users_on_team with error handling
  BEGIN
    INSERT INTO public.users_on_team (
      user_id,
      team_id,
      role,
      is_primary_team
    )
    VALUES (
      new.id,
      new_team_id,
      'owner',
      true
    );
    RAISE LOG 'Successfully added user to team';
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error adding user to team: % %', SQLERRM, SQLSTATE;
    RETURN new;
  END;
  
  RETURN new;
END;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

-- Verify trigger is properly set up
SELECT tgname, tgtype, tgenabled, tgisinternal
FROM pg_trigger
WHERE tgname = 'on_auth_user_created';

-- Check trigger function permissions
SELECT routine_name, grantee, privilege_type
FROM information_schema.routine_privileges
WHERE routine_name = 'handle_new_user';