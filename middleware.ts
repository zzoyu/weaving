import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";
import { isGrantedUserByProfileSlug } from "./actions/is-granted-user";
import { fetchProfileByUserId } from "./app/profile/actions";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/profile")) {
    console.log("profile");
    const client = createClient();
    const { data, error } = await client.auth?.getUser?.();
    if (data?.user?.id) {
      const response = await client
        .from("profile")
        .select()
        .eq("user_id", data.user.id)
        .single();
      if (response.error || !response?.data)
        return NextResponse.rewrite(new URL("/", request.url));
      return NextResponse.rewrite(
        new URL("/u/" + response.data.slug, request.url)
      );
    }

    return NextResponse.rewrite(new URL("/", request.url));

  }
  // update user's auth session
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",

    "/profile",
    "/profile/edit",
  ],
};
