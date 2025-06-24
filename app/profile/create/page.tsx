import { fetchProfileByUserId } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ProfileCreateForm from "./profile-create-form";

export default async function ProfileCreatePage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("User not found");

  const profileResponse = await fetchProfileByUserId(data.user.id);
  if (profileResponse) {
    return (
      <main className="flex flex-col justify-center items-center pt-16 gap-16">
        <h2>프로필 작성하기</h2>
        <p className="text-center text-gray-500">
          프로필 정보가 이미 있습니다.
        </p>
        <Link href="/profile">프로필 보기</Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center pt-16 gap-16">
      <h2>프로필 작성하기</h2>
      <p className="text-center text-gray-500">프로필을 작성해주세요.</p>
      <ProfileCreateForm user={data.user} />
    </main>
  );
}
