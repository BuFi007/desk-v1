-- Create team roles enum
CREATE TYPE public.teamRoles AS ENUM ('owner', 'member');

-- Create users table
CREATE TABLE public.users (
    id uuid PRIMARY KEY,
    email text UNIQUE NOT NULL,
    full_name text,
    avatar_url text,
    locale text DEFAULT 'en',
    week_starts_on_monday boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT fk_auth_user FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create teams table
CREATE TABLE public.teams (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text,
    logo_url text,
    inbox_id text DEFAULT public.generate_inbox(10),
    email text,
    inbox_email text,
    inbox_forwarding boolean DEFAULT true
);

-- Create user_invites table
CREATE TABLE public.user_invites (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
    email text,
    role public.teamRoles,
    code text DEFAULT public.nanoid(24),
    invited_by uuid REFERENCES public.users(id) ON DELETE CASCADE,
    CONSTRAINT unique_team_invite UNIQUE (email, team_id)
);

-- Create users_on_team table
CREATE TABLE public.users_on_team (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
    role public.teamRoles,
    is_primary_team boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    PRIMARY KEY (user_id, team_id, id)
);

-- Create indexes
CREATE INDEX users_on_team_team_id_idx ON public.users_on_team USING btree (team_id);
CREATE UNIQUE INDEX one_primary_team_per_user ON public.users_on_team (user_id) WHERE is_primary_team = true;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users_on_team ENABLE ROW LEVEL SECURITY;

-- Create triggers
CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();