"use server";

import { createClient } from "@supabase/supabase-js";

export async function deleteAccount(id: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (!id) throw new Error("User ID is required");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("key is not defined");
  }

  const { data, error } = await supabase.auth.admin.deleteUser(id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
