DROP FUNCTION IF EXISTS public.create_team_v2(text);
DROP FUNCTION IF EXISTS public.create_team_v2(text, text);
DROP FUNCTION IF EXISTS public.create_team_v2(text, text, text);

create or replace function public.create_team_v2(
  name text,
  currency text default 'USD',
  logo_url text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_team_id uuid;
  auth_user_id uuid;
begin
  -- Get the authenticated user's ID
  auth_user_id := auth.uid();
  
  -- Insert the new team
  insert into public.teams (
    id,
    name,
    created_at,
    logo_url,
    email,
    inbox_email
  )
  values (
    gen_random_uuid(),
    name,
    now(),
    logo_url,
    (select email from auth.users where id = auth_user_id),
    (select email from auth.users where id = auth_user_id)
  )
  returning id into new_team_id;

  -- Create users_on_team entry
  insert into public.users_on_team (
    team_id,
    user_id,
    role,
    created_at
  )
  values (
    new_team_id,
    auth_user_id,
    'owner',
    now()
  );

  return new_team_id;
end;
$$;

-- Grant permission for function
grant execute on function public.create_team_v2(text, text, text) to authenticated;