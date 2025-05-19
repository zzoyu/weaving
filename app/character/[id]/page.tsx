import { fetchCharacter } from "@/app/(with-ui)/u/[slug]/[id]/actions";
import { fetchProfileById } from "@/app/(with-ui)/u/[slug]/actions";
import { redirect } from "next/navigation";

export default async function RedirectCharacterPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const character = await fetchCharacter(id);

  if (!character) {
    throw new Error("Character not found");
  }

  const profile = await fetchProfileById(character.profile_id);

  if (!profile?.data?.slug) {
    throw new Error("Profile not found");
  }

  redirect(`/u/${profile?.data?.slug}/${character.id}`); // Redirect to the character page
}
