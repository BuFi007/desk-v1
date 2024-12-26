-- Create RLS policies for users
CREATE POLICY select_own_profile ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY update_own_profile ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can select users if they are in the same team" ON public.users
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.users_on_team
        WHERE users_on_team.user_id = auth.uid()
        AND users_on_team.team_id = users.team_id
    ));

-- Create RLS policies for teams
CREATE POLICY "Teams can be selected by a member of the team" ON public.teams
    FOR SELECT USING (id IN (SELECT private.get_teams_for_authenticated_user()));

CREATE POLICY "Enable insert for authenticated users only" ON public.teams
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Teams can be updated by a member of the team" ON public.teams
    FOR UPDATE USING (id IN (SELECT private.get_teams_for_authenticated_user()));

CREATE POLICY "Teams can be deleted by a member of the team" ON public.teams
    FOR DELETE USING (id IN (SELECT private.get_teams_for_authenticated_user()));

CREATE POLICY "Invited users can select team if they are invited." ON public.teams
    FOR SELECT USING (id IN (SELECT private.get_invites_for_authenticated_user()));

-- Create RLS policies for user_invites
CREATE POLICY "User Invites can be created by a member of the team" ON public.user_invites
    FOR INSERT WITH CHECK (team_id IN (SELECT private.get_teams_for_authenticated_user()));

CREATE POLICY "User Invites can be selected by a member of the team" ON public.user_invites
    FOR SELECT USING (team_id IN (SELECT private.get_teams_for_authenticated_user()));

CREATE POLICY "Enable select for users based on email" ON public.user_invites
    FOR SELECT USING ((auth.jwt() ->> 'email'::text) = email);

CREATE POLICY "User Invites can be updated by a member of the team" ON public.user_invites
    FOR UPDATE USING (team_id IN (SELECT private.get_teams_for_authenticated_user()));

CREATE POLICY "User Invites can be deleted by a member of the team" ON public.user_invites
    FOR DELETE USING (team_id IN (SELECT private.get_teams_for_authenticated_user()));

CREATE POLICY "User Invites can be deleted by invited email" ON public.user_invites
    FOR DELETE USING ((auth.jwt() ->> 'email'::text) = email);

-- Create RLS policies for users_on_team
CREATE POLICY "Enable read access for all users" ON public.users_on_team
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.users_on_team
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable updates for users on team" ON public.users_on_team
    FOR UPDATE TO authenticated
    USING (team_id IN (SELECT private.get_teams_for_authenticated_user()))
    WITH CHECK (team_id IN (SELECT private.get_teams_for_authenticated_user()));

CREATE POLICY "Users on team can be deleted by a member of the team" ON public.users_on_team
    FOR DELETE USING (team_id IN (SELECT private.get_teams_for_authenticated_user()));