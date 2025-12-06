import { isGrantedUserByProfileSlug } from "@/actions/is-granted-user";
import { fetchPlanByProfileId } from "@/app/actions/plan";
import { fetchCharactersByProfileId } from "@/app/character/actions";
import { Universe } from "@/types/universe";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { fetchCharactersByUniverseId, fetchUniverseById } from "../../actions";
import EditUniverse from "./components/edit-universe";

export default async function EditPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const supabase = await createClient();
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
  console.log(
    "characters:",
    characters,
    params.id,
    universe,
    charactersOfProfile
  );

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
        onSubmit={async (
          data: Universe & { characterUniverses?: { character_id: number }[] }
        ) => {
          "use server";
          const supabase = await createClient();

          // 이미지가 변경되었는지 확인 (URL이 blob:으로 시작하는 경우)
          let image = data.image;
          if (image?.[0]?.startsWith("blob:")) {
            // TODO: 이미지 업로드 로직 구현
            // 현재는 임시로 기존 이미지 유지
            image = universe.image;
          }

          const { error } = await supabase
            .from("universes")
            .update({
              name: data.name,
              description: data.description,
              hashtags: data.hashtags,
              properties: data.properties,
              image: image,
            })
            .eq("id", universe.id);

          if (error) {
            throw new Error("세계관 수정 중 오류가 발생했습니다.");
          }

          // 기존 캐릭터-세계관 관계 삭제
          await supabase
            .from("universes_characters")
            .delete()
            .eq("universe_id", universe.id);

          // 새로운 캐릭터-세계관 관계 생성
          const characterUniverses = data.characterUniverses || [];
          if (characterUniverses.length > 0) {
            const { error: relationError } = await supabase
              .from("universes_characters")
              .insert(
                characterUniverses.map((cu) => ({
                  character_id: cu.character_id,
                  universe_id: universe.id,
                }))
              );

            if (relationError) {
              throw new Error("캐릭터-세계관 관계 생성에 실패했습니다.");
            }
          }

          redirect(`/u/${params.slug}/v/${params.id}`);
        }}
      />
    </main>
  );
}
