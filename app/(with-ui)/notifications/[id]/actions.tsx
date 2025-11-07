"use server";

import { createClient } from "@/utils/supabase/server";

export async function deleteNotificationById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notification")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
}
