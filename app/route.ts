import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // 인증되지 않은 사용자 또는 세션 만료
  if (!user?.id || error) {
    return redirect("/signin");
  }

  // 추가: 프로필이 없는 경우 리디렉션
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (profileError || !profileData) {
    return redirect("/onboarding");
  }

  // 여기에 추가 로직을 넣을 수 있습니다.
  redirect(`/u/${profileData.slug}`);
}
