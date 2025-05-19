import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { fetchProfileByUserId } from "../../profile/actions";
import MypageTemplate from "./components/mypage-template";

export default async function EditPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const profile = await fetchProfileByUserId(data?.user?.id as string);
  if (!profile) {
    redirect("/");
  }

  return <MypageTemplate profile={profile} />;
}
