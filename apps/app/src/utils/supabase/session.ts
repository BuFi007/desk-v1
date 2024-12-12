import { createClient } from "./client";

export async function getSession() {
  const supabase = createClient();

  const session = await supabase.auth.getSession();
  return session.data.session;
}
