import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";
import { isGrantedUserByProfileSlug } from "./actions/is-granted-user";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/profile")) {
    const client = createClient();
    const { data, error } = await client.auth?.getUser?.();
    if (!data?.user?.id) return NextResponse.rewrite(new URL("/", request.url));
  }
  const dynamicRouteMatch = /^\/u\/([^/]+)\/add$/.exec(
    request.nextUrl.pathname
  );
  if (dynamicRouteMatch) {
    const isGranted = await isGrantedUserByProfileSlug(dynamicRouteMatch[1]);
    if (!isGranted) return NextResponse.rewrite(new URL("/", request.url));
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
    "/u/:slug*/add",
  ],
};
