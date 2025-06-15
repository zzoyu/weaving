import { isGrantedUserByProfileSlug } from "@/actions/is-granted-user";
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
  const supabase = createClient();
  const isGranted = await isGrantedUserByProfileSlug(params.slug);
  if (!isGranted) {
    redirect("/");
  }

  const universe = await fetchUniverseById(Number(params.id));
  if (!universe) {
    notFound();
  }

  const { characters } = await fetchCharactersByUniverseId(Number(params.id));

  return (
    <main className="flex flex-col justify-center items-center pt-10 w-full md:max-w-[40rem] mx-auto gap-10">
      <EditUniverse
        universe={universe}
        characters={characters}
        onSubmit={async (data: Universe) => {
          "use server";
          const supabase = createClient();
          
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

          redirect(`/u/${params.slug}/v/${params.id}`);
        }}
      />
    </main>
  );
}
