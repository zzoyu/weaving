"use client";

import { createClient } from "@/utils/supabase/client";

export async function signInWithTwitter() {
  const supabase = createClient();
  
  const redirectUrl = new URL(window.location.href);
  redirectUrl.pathname = "/auth/callback";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: redirectUrl.toString(),
      queryParams: {
        next: "/",
      },
    },
  });

  return { data, error };
}

export async function signInWithGoogle() {
  const supabase = createClient();

  const redirectUrl = new URL(window.location.href);
  redirectUrl.pathname = "/auth/callback";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl.toString(),
      queryParams: {
        next: "/",
      },
    },
  });

  return { data, error };
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
}
