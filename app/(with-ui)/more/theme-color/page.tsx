import { fetchCharactersByProfileId } from "@/app/character/actions";
import { fetchProfileByUserId } from "@/app/profile/actions";
import MorePageResultAd from "@/components/ads/more-result-ad";
import { createClient } from "@/utils/supabase/server";
import ThemeColorChart from "../components/ThemeColorChart";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ThemeColorPage({ params }: PageProps) {
  const supabase = await createClient();
  const { data: currentUser } = await supabase.auth.getUser();

  if (!currentUser?.user?.id) {
    return (
      <main className="flex flex-col h-full justify-center items-center pt-2 lg:pt-10 w-full lg:max-w-[40rem] mx-auto">
        <h1 className="text-2xl font-bold font-pretendard">
          로그인이 필요합니다
        </h1>
      </main>
    );
  }

  const myProfile = await fetchProfileByUserId(currentUser.user.id);
  if (!myProfile?.id) {
    return (
      <main className="flex flex-col h-full justify-center items-center pt-2 lg:pt-10 w-full lg:max-w-[40rem] mx-auto">
        <h1 className="text-2xl font-bold font-pretendard">
          프로필을 먼저 생성해주세요
        </h1>
      </main>
    );
  }

  const characters = await fetchCharactersByProfileId(myProfile.id);

  if (characters.length === 0) {
    return (
      <main className="flex flex-col h-full justify-center items-center pt-2 lg:pt-10 w-full lg:max-w-[40rem] mx-auto">
        <h1 className="text-2xl font-bold font-pretendard">
          캐릭터를 먼저 생성해주세요
        </h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col h-fit pt-2 lg:pt-10 w-full lg:max-w-[40rem] mx-auto pb-10">
      <>
        <h1 className="text-2xl font-bold font-pretendard mb-4">
          테마 컬러 분석
        </h1>
        <ThemeColorChart characters={characters} />
        <MorePageResultAd />
      </>
    </main>
  );
}
