export const dynamic = "force-dynamic";

import ButtonFavorite from "@/app/(with-ui)/@header/components/button-favorite";
import {
  fetchCharacter,
  fetchIsFavoriteById,
} from "@/app/(with-ui)/u/[slug]/[id]/actions";
import ButtonDelete from "@/app/(with-ui)/u/[slug]/components/button-delete";
import { fetchProfileByUserId } from "@/app/profile/actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MoreIcon from "@/public/assets/icons/more.svg";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ButtonLock from "./components/button-lock";
import { ButtonUnlock } from "./components/button-unlock";
import { DialogShareButton } from "./components/dialog-share-button";

export default async function Header({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const profile = await fetchProfileByUserId(data?.user?.id as string);

  const isLoggedIn = !!data.user?.id;
  const isMine = profile?.slug === params.slug;
  const character = await fetchCharacter(Number(params.id));
  const isFavorite = await fetchIsFavoriteById(profile?.id, Number(params.id));

  return (
    <header
      className="fixed top-0 flex w-full items-center justify-between py-4 px-2 md:px-8 bg-transparent"
      key={params.id}
    >
      <Link href="./">
        <button className="p-1 rounded-full h-10 flex items-center justify-center text-2xl  bg-transparent">
          <span className="text-primary-300">← 프로필</span>
        </button>
      </Link>
      <div className="flex items-center gap-2">
        {character && isLoggedIn && profile?.id && (
          <ButtonFavorite
            characterId={character.id}
            isFavorite={isFavorite}
            profileId={profile.id}
          />
        )}
        {isMine && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-1 border border-primary-100 rounded-full overflow-hidden w-10 h-10 flex items-center justify-center">
                <MoreIcon width={24} height={24} className="text-primary-300" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48" autoFocus={false} tabIndex={-1}>
              <div className="flex flex-col gap-2 p-4 justify-start items-start">
                {character?.id && !character?.password && (
                  <ButtonLock characterId={character.id} />
                )}
                {character?.id && character?.password?.length && (
                  <ButtonUnlock characterId={character.id} />
                )}
                <Link
                  href={`${params.id}/edit`}
                  className="text-base text-gray-700 hover:text-primary-500"
                >
                  프로필 수정
                </Link>
                <DialogShareButton>프로필 공유</DialogShareButton>
                <ButtonDelete
                  data={character}
                  className="text-base text-gray-700 hover:text-primary-500"
                >
                  프로필 삭제
                </ButtonDelete>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
}
