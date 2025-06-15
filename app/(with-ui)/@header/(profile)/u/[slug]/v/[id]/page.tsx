export const dynamic = "force-dynamic";

import { fetchUniverseById } from "@/app/(with-ui)/u/[slug]/v/actions";
import { fetchProfileByUserId } from "@/app/profile/actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UniverseMenu from "@/components/universe-menu";
import MoreIcon from "@/public/assets/icons/more.svg";
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
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-1 rounded-full overflow-hidden w-10 h-10 flex items-center justify-center">
                <MoreIcon width={24} height={24} className="text-primary-300" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48" autoFocus={false} tabIndex={-1} align="end">
              <div className="flex flex-col gap-2 p-4 justify-start items-start">
                <Link
                  href={`/u/${params.slug}/v/${params.id}/edit`}
                  className="text-base text-gray-700 hover:text-primary-500"
                >
                  세계관 수정
                </Link>
                <UniverseMenu universeId={universe.id} />
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
}
