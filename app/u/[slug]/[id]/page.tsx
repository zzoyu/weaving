import { notFound, redirect } from "next/navigation";
import {
  compareCharacterPassword,
  fetchCharacter,
  fetchRelationships,
} from "./actions";
import { createClient } from "@/utils/supabase/server";
import {
  fetchIsFriendByIds,
  fetchProfileById,
  fetchProfileBySlug,
} from "../actions";
import { EPropertyType } from "@/types/character";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
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

  return {
    ...baseMetadata,
    title: "위빙 :: " + characterData.name + " 관찰 중 🔍",
    openGraph: { images: [characterData.thumbnail!] },
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
  console.log(relationships);

  const supabase = createClient();

  const currentUser = await supabase.auth.getUser();

  const { data, error } = await fetchProfileBySlug(slug);
  if (!data) notFound();

  const myProfile = await fetchProfileById(
    currentUser?.data.user?.id as string
  );

  const responseIsFriend = await fetchIsFriendByIds(
    data?.id,
    myProfile?.data?.id
  );

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
