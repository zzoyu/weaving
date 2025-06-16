import { fetchProfileByUserId } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import { fetchCharactersByProfileId } from "../../actions";
import ThemeColorChart from "../components/ThemeColorChart";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ThemeColorPage({ params }: PageProps) {
  const supabase = createClient();
  const { data: currentUser } = await supabase.auth.getUser();

  if (!currentUser?.user?.id) {
    return (
      <main className="flex flex-col h-full justify-center items-center pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto">
        <h1 className="text-2xl font-bold font-pretendard">
          로그인이 필요합니다
        </h1>
      </main>
    );
  }

  const myProfile = await fetchProfileByUserId(currentUser.user.id);
  if (!myProfile?.id) {
    return (
      <main className="flex flex-col h-full justify-center items-center pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto">
        <h1 className="text-2xl font-bold font-pretendard">
          프로필을 먼저 생성해주세요
        </h1>
      </main>
    );
  }

  const { data: characters } = await fetchCharactersByProfileId(myProfile.id);

  return (
    <main className="flex flex-col h-full pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto">
      <ThemeColorChart characters={characters} />
    </main>
  );
}
