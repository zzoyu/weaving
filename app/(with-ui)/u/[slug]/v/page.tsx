import { fetchProfileBySlug } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import { fetchUniversesByProfileId } from "./actions";
import ButtonAddUniverse from "./components/button-add-universe";
import { UniverseList } from "./components/universe-list";
import { UniverseListSkeleton } from "./components/universe-list-skeleton";

export default async function UniversePage({
  params,
}: {
  params: { slug: string };
}) {
  const profile = await fetchProfileBySlug(params.slug);
  if (!profile) {
    throw new Error("프로필을 찾을 수 없습니다.");
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isMine = user?.id === profile.user_id;

  const universes = await fetchUniversesByProfileId(profile.id);

  return (
    <main className="flex flex-col justify-start items-center pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto h-full pb-[3.75rem] min-h-fit relative">
      <div className="flex flex-col items-center justify-start my-10">
        <h2 className="text-xl md:text-2xl mb-2.5">{profile.nickname}의 세계관</h2>
        <span className="text-gray-600 text-sm md:text-base">
          {universes.length || 0}개의 세계관
        </span>
      </div>

      {isMine && <ButtonAddUniverse slug={params.slug} />}

      <div className="w-full mt-2">
        <Suspense fallback={<UniverseListSkeleton />}>
          <UniverseList
            universes={universes}
            favoriteUniverses={[]}
            slug={params.slug}
            isMine={isMine}
            profileId={profile.id}
            profile={profile}
          />
        </Suspense>
      </div>
    </main>
  );
} 