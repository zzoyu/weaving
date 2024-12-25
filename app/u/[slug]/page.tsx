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
import { fetchProfileById } from "@/app/profile/actions";
import ButtonRequestFriend from "./components/button-request-friend";
import ButtonAcceptFriend from "./components/button-accept-friend";
import { useMemo } from "react";
import { TabHeader } from "./components/tab-header";
import { ProfileList } from "./components/profile-list";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const baseMetadata: Metadata = {
  title: "위빙 프로필",
  description: "너와 나의 연결 고리, 위빙",
  applicationName: "위빙",
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  const { data, error } = await fetchProfileBySlug(slug);

  if (error) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: data.nickname + "의 프로필",
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
    myProfile = await fetchProfileById(currentUser?.data?.user?.id as string);
    friendDataFromMe = await fetchExactFriendById(myProfile?.id!, data.id!);
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
    <main className="flex flex-col justify-center items-center pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto">
      {isMine && myProfile && myProfile?.slug && (
        <TabHeader slug={myProfile.slug} activeIndex={0} />
      )}

      {!isMine && myProfile && (
        <ButtonRequestFriend
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
  );
}
