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
    <main className="flex flex-col items-center min-h-[80vh] py-12">
      <div className="w-full max-w-xl px-4">
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
        {isMine && <ButtonAddUniverse slug={params.slug} />}
      </div>
    </main>
  );
} 