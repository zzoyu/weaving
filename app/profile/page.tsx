import { createClient } from "@/utils/supabase/server";
import ProfileTwitter from "./components/profile-twitter";
import { fetchProfileByUserId } from "./actions";
import Link from "next/link";
import ProfileInformation from "./components/profile-information";
import { Tab } from "../components/tab/tab";
import { TabItem } from "../components/tab/tab-item";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const metadata = data.user?.user_metadata as TwitterMetadata;

  const profileResponse = await fetchProfileByUserId(data.user?.id as string);
  if (profileResponse?.id !== undefined) {
    redirect(`/u/${profileResponse.slug}`);
  }

  return (
    <main className="flex flex-col justify-center items-center pt-16 gap-16">
      <ProfileTwitter metadata={metadata} />

      <div className=" w-96">
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
      </div>
    </main>
  );
}
