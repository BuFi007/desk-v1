export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_posts_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          date_format: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          locale: string | null;
          team_id: string | null;
          time_format: number | null;
          timezone: string | null;
          week_starts_on_monday: boolean | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          date_format?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          locale?: string | null;
          team_id?: string | null;
          time_format?: number | null;
          timezone?: string | null;
          week_starts_on_monday?: boolean | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          date_format?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          locale?: string | null;
          team_id?: string | null;
          time_format?: number | null;
          timezone?: string | null;
          week_starts_on_monday?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_auth_user";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_invites: {
        Row: {
          code: string | null;
          created_at: string;
          email: string | null;
          id: string;
          invited_by: string | null;
          role: Database["public"]["Enums"]["teamRoles"] | null;
          team_id: string | null;
        };
        Insert: {
          code?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          invited_by?: string | null;
          role?: Database["public"]["Enums"]["teamRoles"] | null;
          team_id?: string | null;
        };
        Update: {
          code?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          invited_by?: string | null;
          role?: Database["public"]["Enums"]["teamRoles"] | null;
          team_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_user_invites_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_invites_invited_by_fkey";
            columns: ["invited_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      teams: {
        Row: {
          id: string;
          name: string | null;
          created_at: string;
          updated_at: string | null;
          logo_url: string | null;
          inbox_id: string | null;
          email: string | null;
          inbox_email: string | null;
          inbox_forwarding: boolean;
        };
        Insert: {
          id?: string | null;
          name: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string | null;
          name?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_users_on_team_team";
            columns: ["id"];
            isOneToOne: false;
            referencedRelation: "users_on_team";
            referencedColumns: ["team_id"];
          },
        ];
      };
      users_on_team: {
        Row: {
          created_at: string | null;
          id: string;
          role: Database["public"]["Enums"]["teamRoles"] | null;
          team_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          role?: Database["public"]["Enums"]["teamRoles"] | null;
          team_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          role?: Database["public"]["Enums"]["teamRoles"] | null;
          team_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_on_team_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_on_team_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_team: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      create_team_v2: {
        Args: {
          name: string;
          currency?: string;
          logo_url?: string | null;
        };
        Returns: string;
      };
    };
    Enums: {
      teamRoles: "owner" | "member";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
