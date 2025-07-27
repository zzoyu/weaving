import { generateOgImage } from "@/actions/generate-og-image";
import { fetchProfileByUserId } from "@/app/profile/actions";
import { EPropertyType } from "@/types/character";
import { getPublicUrl } from "@/utils/image";
import { createClient } from "@/utils/supabase/server";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { fetchIsFriendByIds, fetchProfileBySlug } from "../actions";
import {
  compareCharacterPassword,
  fetchCharacter,
  fetchRelationships,
} from "./actions";
import TemplateProfile from "./components/template-profile";
import Loading from "./loading";

interface Props {
  params: { slug: string; id: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

const baseMetadata: Metadata = {
  title: "위빙 프로필",
  description: "우리의 세계가 만나는 곳",
  applicationName: "위빙",
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  const characterData = await fetchCharacter(id);

  if (!characterData) {
    return baseMetadata;
  }

  const ogImage = (await generateOgImage(
    characterData.name,
    characterData.description || "",
    getPublicUrl(characterData.thumbnail) || ""
  )) as Response;

  const ogImageUrl = ogImage.url;

  return {
    ...baseMetadata,
    title: "위빙 :: " + characterData.name + " 관찰 중 🔎",
    openGraph: {
      images: [
        {
          url: ogImageUrl,
        },
      ],
    },
  };
}

export default async function CharacterPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { slug, id } = params;

  const characterData = await fetchCharacter(Number(id));
  if (!characterData) notFound();

  const relationships = await fetchRelationships(Number(id));

  const supabase = createClient();

  const currentUser = await supabase.auth.getUser();

  const { data, error } = await fetchProfileBySlug(slug);
  if (!data) notFound();

  const myProfile = await fetchProfileByUserId(
    currentUser?.data.user?.id as string
  );

  const responseIsFriend = await fetchIsFriendByIds(data?.id, myProfile?.id);

  if (error) {
    throw error;
  }

  let isMyProfile = false;

  if (data.user_id === currentUser?.data.user?.id) {
    isMyProfile = true;
  }

  const colorProperties = characterData.properties.filter(
    (property) => property.type === EPropertyType.COLOR
  );

  const cookie = await cookies();
  const responseIsPasswordCorrect = await compareCharacterPassword(
    Number(id),
    cookie?.get(`${slug}-${id}`)?.value
  );
  const isGranted =
    isMyProfile ||
    responseIsFriend ||
    responseIsPasswordCorrect ||
    !characterData.password;

  if (!isGranted) {
    redirect(`/u/${slug}/${id}/not-granted`);
  }

  return (
    <main className="flex flex-col justify-start items-center pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto h-full pb-10 min-h-fit">
      <Suspense fallback={<Loading />}>
        <TemplateProfile
          {...{
            characterData,
            relationships: relationships || [],
            colorProperties,
            isMyProfile,
            slug,
            id,
          }}
        />
      </Suspense>
    </main>
  );
}
