import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import { fetchProfileByUserId } from "@/app/profile/actions";
import { createProfile } from "@/app/profile/create/actions";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        return NextResponse.error();
      }
      const profile = await fetchProfileByUserId(userData?.user?.id as string);
      if (!profile) {
        const payload = new FormData();
        payload.append("user_id", userData?.user?.id as string);
        payload.append(
          "profile_url",
          userData?.user?.user_metadata?.picture as string
        );
        payload.append(
          "nickname",
          userData?.user?.user_metadata?.full_name as string
        );
        payload.append(
          "slug",
          userData?.user?.user_metadata.user_name as string
        );
        await createProfile(payload);
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
