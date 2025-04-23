import {
  fetchCharactersByProfileId,
  fetchExactFriendById,
  fetchFavoriteCharactersByProfileId,
  fetchProfileBySlug,
} from "./actions";
import { Metadata, ResolvingMetadata } from "next";
import { createClient } from "@/utils/supabase/server";
import Information from "./components/information";
import { ErrorCode } from "@/types/error-code";
import ListCharacter from "./components/list-character/list-character";
import ButtonAddCharacter from "./components/button-add-character";
import { ButtonHome } from "./components/button-home";
import ButtonShare from "./components/button-share";
import { fetchProfileByUserId } from "@/app/profile/actions";
import ButtonRequestFriend from "./components/button-request-friend";
import ButtonAcceptFriend from "./components/button-accept-friend";
import { useMemo } from "react";
import { TabHeader } from "./components/tab-header";
import { ProfileList } from "./components/profile-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const baseMetadata: Metadata = {
  title: "위빙 프로필",
  description: "우리의 세계가 만나는 곳",
  applicationName: "위빙",
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  const { data, error } = await fetchProfileBySlug(slug);

  if (!data) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: "위빙 :: " + data.nickname + "의 프로필",
    openGraph: { images: [data.profile_image!] },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  "use cache";
  const { slug } = params;
  if (!slug) throw { message: "Slug not found" };

  const { data, error } = await fetchProfileBySlug(slug);

  if (error) {
    throw error;
  }

  const supabase = createClient();

  let myProfile: Profile | null = null;
  const currentUser = await supabase.auth.getUser();

  let friendDataFromMe: Friend | null = null;
  let friendDataFromUser: Friend | null = null;
  let isFriend = false;
  if (currentUser?.data.user?.id) {
    myProfile = await fetchProfileByUserId(
      currentUser?.data?.user?.id as string
    );
    friendDataFromMe = await fetchExactFriendById(myProfile?.id!, data?.id!);
    friendDataFromUser = await fetchExactFriendById(data.id!, myProfile?.id!);
    isFriend = Boolean(friendDataFromMe || friendDataFromUser);
  }

  const responseCharacters = await fetchCharactersByProfileId(data.id!);

  if (responseCharacters.error) {
    if (responseCharacters.error?.code !== ErrorCode.NO_ITEM) {
      throw responseCharacters.error;
    }
  }

  const isMine = currentUser?.data?.user?.id === data.user_id;

  let favoriteCharacters: number[] = [];

  favoriteCharacters = await fetchFavoriteCharactersByProfileId(data.id);

  return (
    <Suspense
      fallback={
        <main className="flex flex-col justify-start items-center pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto h-full pb-10 min-h-fit">
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-40 w-full mb-4" />
          <Skeleton className="h-40 w-full mb-4" />
        </main>
      }
    >
      <main className="flex flex-col justify-start items-center pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto h-full pb-10 min-h-fit">
        {isMine && myProfile && myProfile?.slug && (
          <TabHeader
            activeIndex={0}
            data={[
              {
                title: "프로필 목록",
                href: `/u/${myProfile.slug}`,
              },
              {
                title: "캐릭터 추가",
                href: `/u/${myProfile.slug}/add`,
              },
            ]}
          />
        )}

        {!isMine && myProfile && (
          <ButtonRequestFriend
            isMine={isMine}
            isFriend={isFriend}
            isApproved={
              !!(
                Boolean(friendDataFromMe?.is_approved) ||
                Boolean(friendDataFromUser?.is_approved)
              )
            }
            from={myProfile}
            to={data}
          />
        )}
        <ProfileList
          characters={responseCharacters?.data || []}
          slug={slug}
          isMine={isMine}
          favoriteCharacters={favoriteCharacters}
          profileId={myProfile?.id}
        />
      </main>
    </Suspense>
  );
}
