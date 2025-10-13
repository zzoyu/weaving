import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { fetchProfileByUserId } from "./app/profile/actions";
import { createClient } from "./utils/supabase/server";

// 인증이 필요한 라우트 패턴
const protectedRoutes = [
  "/profile",
  "/mypage",
  "/u/:slug/add",
  // 추가 보호 라우트...
];

// 공개 라우트 패턴
const publicRoutes = [
  "/",
  "/auth",
  "/login",
  "/onboarding",
  "/u/:slug",
  "/posts/:id",
  "/terms",
  "/privacy",
  "/guideline",
  "/about",
  "/blog",
  "/help",
  // 추가 공개 라우트...
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 공개 라우트는 세션 업데이트만 수행
  if (publicRoutes.some((route) => path.startsWith(route))) {
    return await updateSession(request);
  }

  // 보호된 라우트에 대한 인증 체크
  if (protectedRoutes.some((route) => path.startsWith(route))) {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // 인증되지 않은 사용자 또는 세션 만료 또는 프로필이 없음
    if (!user?.id || error) {
      const redirectUrl = new URL("/signin", request.url);
      redirectUrl.searchParams.set("redirect", path);
      return NextResponse.redirect(redirectUrl);
    }

    const profile = await fetchProfileByUserId(user.id);
    if (!profile) {
      const redirectUrl = new URL("/onboarding", request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // 프로필 라우트 특별 처리
    if (path.startsWith("/profile")) {
      const response = await supabase
        .from("profile")
        .select()
        .eq("user_id", user.id)
        .single();

      if (response.error || !response?.data) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.redirect(
        new URL("/u/" + response.data.slug, request.url)
      );
    }
  }

  // 세션 업데이트 수행
  return await updateSession(request);
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
