"use client";

import { createClient } from "@/utils/supabase/client";

export async function signInWithTwitter() {
  const supabase = createClient();
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_BASE_URL + "/auth/callback",
      queryParams: {
        next: "/profile",
      },
    },
  });

  console.log(data, error);
  return { data, error };
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
}
