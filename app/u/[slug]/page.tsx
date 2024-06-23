import { fetchCharactersByProfileId, fetchProfileBySlug } from "./actions";
import { Metadata, ResolvingMetadata } from "next";
import { createClient } from "@/utils/supabase/server";
import Information from "./components/information";
import { ErrorCode } from "@/types/error-code";
import ListCharacter from "./components/list-character/list-character";
import ButtonAddCharacter from "./components/button-add-character";
import { ButtonHome } from "./components/button-home";
import ButtonShare from "./components/button-share";

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

  const responseCharacters = await fetchCharactersByProfileId(data.id!);
  console.log(responseCharacters);
  if (responseCharacters.error) {
    if (responseCharacters.error?.code !== ErrorCode.NO_ITEM) {
      throw responseCharacters.error;
    }
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-between p-3">
        <ButtonHome />
        <ButtonShare />
      </div>
      <main className="flex flex-col justify-center items-center pt-10">
        <Information
          profile={data}
          isEditable={currentUser?.data?.user?.id === data.user_id}
        />
        <article className="flex flex-col gap-4 mt-5">
          {responseCharacters.data.length > 0 && (
            <ListCharacter characters={responseCharacters.data} slug={slug} />
          )}
          <ButtonAddCharacter slug={slug} />
        </article>
      </main>
    </div>
  );
}
