import MainMenu from "@/app/components/main-menu";
import LogoColored from "@/public/assets/logos/logo_text_vertical_color.svg";
import LogoWhite from "@/public/assets/logos/logo_text_vertical_white.svg";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  const client = createClient();
  const { data, error } = await client.auth?.getUser?.();

  // 인증된 사용자이고 리다이렉트 URL이 있는 경우
  if (data?.user?.id && searchParams.redirect) {
    redirect(searchParams.redirect);
  }

  // 인증된 사용자이고 리다이렉트 URL이 없는 경우
  if (data?.user?.id) {
    redirect("/");
  }

  return (
    <main className="h-full flex flex-col items-center pt-[10vh]">
      <div className="flex-1 w-7/12 max-w-40 flex flex-col items-center justify-center gap-2">
        <span className="block dark:hidden">
          <LogoColored height={160} className="w-fit" />
        </span>
        <span className="hidden dark:block">
          <LogoWhite height={160} className="w-fit" />
        </span>
      </div>

      <MainMenu />
    </main>
  );
}
