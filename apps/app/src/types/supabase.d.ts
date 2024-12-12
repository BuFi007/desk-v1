import { Session } from "@supabase/supabase-js";

declare module "@supabase/supabase-js" {
  interface Session {
    userToken: string;
    encryptionKey: string;
    challengeId: string;
    appId: string;
  }
}
