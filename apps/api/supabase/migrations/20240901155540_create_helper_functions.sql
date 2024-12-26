-- Create helper functions for RLS
CREATE OR REPLACE FUNCTION private.get_teams_for_authenticated_user()
RETURNS SETOF uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
    SELECT team_id FROM users_on_team WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION private.get_invites_for_authenticated_user()
RETURNS SETOF uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
    SELECT team_id FROM user_invites WHERE email = auth.jwt() ->> 'email';
$$;

CREATE OR REPLACE FUNCTION public.create_team(name character varying)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
declare
    new_team_id uuid;
begin
    insert into teams (name) values (name) returning id into new_team_id;
    insert into users_on_team (user_id, team_id, role) values (auth.uid(), new_team_id, 'owner');
    return new_team_id;
end;
$$;