"use client";

import { createClient } from "@/utils/supabase/client";

export async function signInWithTwitter() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo:
        window.location.protocol +
        "//" +
        window.location.host +
        "/auth/callback",
      queryParams: {
        next: "/profile",
      },
    },
  });
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
}
