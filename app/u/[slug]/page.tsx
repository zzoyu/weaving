import {
  fetchCharactersByProfileId,
  fetchExactFriendById,
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
  const { slug } = params;
  if (!slug) throw { message: "Slug not found" };

  const { data, error } = await fetchProfileBySlug(slug);

  if (error) {
    throw error;
  }

  const supabase = createClient();

  const currentUser = await supabase.auth.getUser();
  let myProfile: Profile = await fetchProfileById(
    currentUser?.data?.user?.id as string
  );
  let friendDataFromMe: Friend | null = null;
  let friendDataFromUser: Friend | null = null;
  let isFriend = false;
  if (currentUser?.data.user) {
    friendDataFromMe = await fetchExactFriendById(myProfile.id!, data.id!);
    friendDataFromUser = await fetchExactFriendById(data.id!, myProfile.id!);
    console.log("friendDataFromMe", friendDataFromMe);
    console.log("friendDataFromUser", friendDataFromUser);
    isFriend = Boolean(friendDataFromMe || friendDataFromUser);
  }

  console.log("isFriend", isFriend);

  const responseCharacters = await fetchCharactersByProfileId(data.id!);

  if (responseCharacters.error) {
    if (responseCharacters.error?.code !== ErrorCode.NO_ITEM) {
      throw responseCharacters.error;
    }
  }

  const isMine = currentUser?.data?.user?.id === data.user_id;

  return (
    <div className="w-full">
      <div className="w-full flex justify-between p-3">
        <ButtonHome />
        <ButtonShare />
      </div>
      <main className="flex flex-col justify-center items-center pt-10">
        <Information profile={data} isEditable={isMine} />
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
        <article className="flex flex-col gap-4 mt-5">
          {responseCharacters.data.length > 0 && (
            <ListCharacter characters={responseCharacters.data} slug={slug} />
          )}
          {isMine && <ButtonAddCharacter slug={slug} />}
        </article>
      </main>
    </div>
  );
}
