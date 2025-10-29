import Landing from "@/components/landing";
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
  } else if (data?.user?.id) {
    // 추가: 프로필이 없는 경우 리디렉션
    const { data: profileData, error: profileError } = await client
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .single();

    if (profileError || !profileData) {
      return redirect("/onboarding");
    }

    // 여기에 추가 로직을 넣을 수 있습니다.
    redirect(`/u/${profileData.slug}`);
  }

  return <Landing />;
}
