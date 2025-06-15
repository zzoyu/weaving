import { fetchProfileBySlug } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { fetchCharactersByUniverseId, fetchUniverseById } from "../actions";
import TemplateUniverse from "./components/template-universe";
import Loading from "./loading";

interface Props {
  params: { slug: string; id: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

const baseMetadata: Metadata = {
  title: "위빙 세계관",
  description: "우리의 세계가 만나는 곳",
  applicationName: "위빙",
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  const universeData = await fetchUniverseById(Number(id));

  if (!universeData) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: "위빙 :: " + universeData.name,
    description: universeData.description || baseMetadata.description,
    openGraph: universeData.thumbnail ? { images: [universeData.thumbnail] } : undefined,
  };
}

export default async function UniversePage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { slug, id } = params;

  const universeData = await fetchUniverseById(Number(id));
  if (!universeData) notFound();

  const { characters, error: charactersError } = await fetchCharactersByUniverseId(Number(id));
  if (charactersError) {
    console.error("Error fetching characters:", charactersError);
  }

  const supabase = createClient();
  const currentUser = await supabase.auth.getUser();
  const profile = await fetchProfileBySlug(slug);
  
  if (!profile) notFound();

  const isMyProfile = profile.user_id === currentUser?.data.user?.id;

  return (
    <main className="flex flex-col justify-start items-center pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto h-full pb-10 min-h-fit">
      <Suspense fallback={<Loading />}>
        <TemplateUniverse
          universe={universeData}
          characters={characters}
          isMyProfile={isMyProfile}
          slug={slug}
        />
      </Suspense>
    </main>
  );
}
