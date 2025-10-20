import { fetchProfileByUserId } from "@/app/profile/actions";
import { ErrorCode } from "@/types/error-code";
import { createClient } from "@/utils/supabase/server";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  fetchCharactersByProfileId,
  fetchExactFriendById,
  fetchFavoriteCharactersByProfileId,
  fetchProfileBySlug,
} from "./actions";
import ButtonAddProfile from "./components/button-add-profile";
import ButtonRequestFriend from "./components/button-request-friend";
import { ProfileList } from "./components/profile-list";
import Loading from "./loading";

type Props = {
  params: { slug: string };
};

const baseMetadata: Metadata = {
  title: "위빙 프로필",
  description: "우리의 세계가 만나는 곳",
  applicationName: "위빙",
};

export async function generateMetadata(
  { params }: Props,
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
  const { slug } = params;
  if (!slug) notFound();

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

  const from =
    !friendDataFromMe && !friendDataFromUser
      ? myProfile
      : friendDataFromMe?.from_profile_id
      ? myProfile
      : data;
  const to =
    !friendDataFromMe && !friendDataFromUser
      ? data
      : friendDataFromMe?.to_profile_id
      ? data
      : myProfile;

  if (currentUser?.data.user?.id && (from === null || to === null)) {
    notFound();
  }

  return (
    <main className="flex flex-col justify-start items-center pt-2 lg:pt-10 w-full lg:max-w-[40rem] mx-auto h-full pb-20 min-h-fit relative">
      <div className="flex flex-col items-center justify-start my-10">
        <h2 className="text-xl lg:text-2xl mb-2.5">
          {data?.nickname}의 프로필
        </h2>
        <span className=" text-gray-600 text-sm lg:text-base">
          {responseCharacters?.data.length || 0}개의 캐릭터
        </span>
        {!isMine && myProfile && from && to && (
          <ButtonRequestFriend
            isMyProfile={isMine}
            isMyRequest={!!friendDataFromMe}
            isFriend={isFriend}
            isApproved={
              !!(
                Boolean(friendDataFromMe?.is_approved) ||
                Boolean(friendDataFromUser?.is_approved)
              )
            }
            from={from}
            to={to}
          />
        )}
      </div>
      {isMine && myProfile && myProfile?.slug && (
        <ButtonAddProfile href={`/u/${myProfile.slug}/add#top`} scroll={true} />
      )}

      <Suspense fallback={<Loading />}>
        <ProfileList
          characters={responseCharacters?.data || []}
          slug={slug}
          isMine={isMine}
          favoriteCharacters={favoriteCharacters}
          profileId={myProfile?.id}
        />
      </Suspense>
    </main>
  );
}
