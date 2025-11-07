// 인증이 필요한 라우트 패턴
const protectedRoutes = [
  "/mypage",
  "/u/:slug/add",
  "/u/:slug/:id/edit",
  "/u/:slug/v/:id/edit",

  // 추가 보호 라우트...
];

// 공개 라우트 패턴
const publicRoutes = [
  "/",
  "/auth",
  "/login",
  "/onboarding",
  "/u/:slug",
  "/u/:slug/v",
  "/u/:slug/v/:id",
  "/posts/:id",
  "/terms",
  "/privacy",
  "/guideline",
  "/about",
  "/blog",
  "/help",
  "/more",
  // 추가 공개 라우트...
];

export { protectedRoutes, publicRoutes };
