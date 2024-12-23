import { notFound } from "next/navigation";
import { fetchCharacter, fetchRelationships } from "./actions";
import Image from "next/image";
import { ListRelationship } from "./components/list-relationship";
import ButtonAddRelationship from "./components/button-add-relationship";
import RelationshipGraph from "./components/relationship-graph";
import { createClient } from "@/utils/supabase/server";
import { fetchProfileBySlug } from "../actions";
import { ProfileCard } from "./components/profile-card";
import { ColorProperties } from "../add/components/properties/color-properties";
import { RelationshipCard } from "./components/relationship-card";

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

  if (error) {
    throw error;
  }

  let isMyProfile = false;

  if (data.user_id === currentUser?.data.user?.id) {
    isMyProfile = true;
  }

  return (
    <div className="w-full p-4 md:max-w-[40rem] mx-auto flex flex-col gap-8">
      <ProfileCard character={characterData} />

      {/* {isMyProfile && (
        <ButtonAddRelationship
          character={characterData}
          relationships={relationships || []}
          currentPath={`/u/${slug}/${id}`}
        />
      )} */}

      <hr className="mt-10 p-0 w-full" />

      <ColorProperties properties={characterData.properties} />

      <hr className="mt-0 p-0 w-full" />

      {relationships && (
        <RelationshipCard
          character={characterData}
          relationships={relationships}
        />
      )}
    </div>
  );
}
