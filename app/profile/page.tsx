import { createClient } from "@/utils/supabase/server";
import ProfileTwitter from "./components/profile-twitter";
import { fetchProfile } from "./actions";
import Link from "next/link";
import ProfileInformation from "./components/profile-information";

export default async function ProfilePage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const metadata = data.user?.user_metadata as TwitterMetadata;

  const profileResponse = await fetchProfile(data.user?.id as string);

  console.log(profileResponse);

  console.log(metadata);
  return (
    <main className="flex flex-col justify-center items-center pt-16 gap-16">
      <ProfileTwitter metadata={metadata} />
      {!profileResponse ? (
        <>
          <p className="text-center text-gray-500">
            프로필 정보가 없습니다. 프로필을 작성해주세요.
          </p>
          <Link href="/profile/create">프로필 작성하기</Link>
        </>
      ) : (
        <ProfileInformation profile={profileResponse} />
      )}
    </main>
  );
}
