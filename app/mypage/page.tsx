import ProfileEditForm from "./components/profile-edit-form";
import { fetchProfileBySlug } from "../u/[slug]/actions";
import { createClient } from "@/utils/supabase/server";
import MypageTemplate from "./components/mypage-template";
import { fetchProfileByUserId } from "../profile/actions";

export default async function EditPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const profile = await fetchProfileByUserId(data?.user?.id as string);
  if (!profile) {
    return (
      <main className="flex flex-col items-center justify-center w-full h-full">
        <section className="w-full max-w-md p-4 bg-white rounded shadow-md">
          <h1 className="text-xl font-bold mb-4">마이페이지</h1>
          <p className="text-red-500">로그인이 필요합니다.</p>
        </section>
      </main>
    );
  }

  console.log(profile);

  return <MypageTemplate profile={profile} />;
}
