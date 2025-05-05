import ProfileEditForm from "./components/profile-edit-form";
import { fetchProfileBySlug } from "../u/[slug]/actions";
import { createClient } from "@/utils/supabase/server";
import MypageTemplate from "./components/mypage-template";
import { fetchProfileByUserId } from "../../profile/actions";

export default async function EditPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const profile = await fetchProfileByUserId(data?.user?.id as string);
  if (!profile) {
    throw new Error("Profile not found");
  }

  return <MypageTemplate profile={profile} />;
}
