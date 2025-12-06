import { isGrantedUserByProfileSlug } from "@/actions/is-granted-user";
import { fetchPlanByProfileId } from "@/app/actions/plan";
import { fetchCharactersByProfileId } from "@/app/character/actions";
import { notFound, redirect } from "next/navigation";
import { fetchCharactersByUniverseId, fetchUniverseById } from "../../actions";
import { updateUniverse } from "./actions";
import EditUniverse from "./components/edit-universe";

export default async function EditPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const isGranted = await isGrantedUserByProfileSlug(params.slug);
  if (!isGranted) {
    redirect("/");
  }

  const universe = await fetchUniverseById(Number(params.id));
  if (!universe) {
    notFound();
  }

  const charactersOfProfile = await fetchCharactersByProfileId(
    universe.profile_id
  );
  const { characters } = await fetchCharactersByUniverseId(Number(params.id));
  const plan = await fetchPlanByProfileId(universe.profile_id);
  if (!plan) {
    redirect(`/u/${params.slug}/v/${params.id}`);
  }

  return (
    <main
      className="flex flex-col justify-center items-center pt-10 w-full lg:max-w-[40rem] mx-auto gap-10"
      id="top"
    >
      <EditUniverse
        universe={universe}
        initialCharacters={characters}
        characters={charactersOfProfile}
        plan={plan}
        onSubmit={async (formData: FormData) => {
          "use server";
          await updateUniverse(
            formData,
            universe.id,
            universe.profile_id,
            params.slug
          );
        }}
      />
    </main>
  );
}
