export const dynamic = "force-dynamic";

import { fetchUniverseById } from "@/app/(with-ui)/u/[slug]/v/actions";
import { fetchProfileByUserId } from "@/app/profile/actions";
import UniverseMenu from "@/components/universe-menu";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Header({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const profile = await fetchProfileByUserId(data?.user?.id as string);

  const isLoggedIn = !!data.user?.id;
  const universe = await fetchUniverseById(Number(params.id));
  const isMine = profile?.slug === params.slug && profile?.id === universe?.profile_id;

  if (!universe) return null;

  // 클라이언트 상태로 메뉴 토글
  // (실제 적용 시 아래 부분을 client 컴포넌트로 분리하는 것이 best practice)
  return (
    <header
      className="fixed top-0 flex w-full items-center justify-between py-4 px-2 md:px-8 bg-transparent"
      key={params.id}
    >
      <Link href={`/u/${params.slug}`}>
        <button className="p-1 rounded-full h-10 flex items-center justify-center text-2xl bg-transparent">
          <span className="text-primary-300">← 세계관</span>
        </button>
      </Link>
      <div className="flex items-center gap-2">
        {isMine && (
          <UniverseMenu universeId={universe.id} />
        )}
      </div>
    </header>
  );
}
