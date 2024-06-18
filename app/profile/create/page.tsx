import { createClient } from "@/utils/supabase/server";
import { createProfile, fetchProfile } from "../actions";
import Link from "next/link";

export default async function ProfileCreatePage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("User not found");

  const profileResponse = await fetchProfile(data.user.id);
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
      <form className="flex flex-col" action={createProfile}>
        <input hidden type="text" name="user_id" value={data.user.id} />
        <input
          hidden
          type="text"
          name="profile_url"
          value={(data.user.user_metadata as TwitterMetadata).avatar_url}
        />
        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="nickname"
          required
          className="bg-transparent"
        />
        <label htmlFor="slug">접근 주소</label>
        <input type="text" name="slug" required className="bg-transparent" />
        <label htmlFor="profile_image">프로필 이미지</label>
        <input type="file" name="profile_image" className="" />
        <button type="submit">작성하기</button>
      </form>
    </main>
  );
}
