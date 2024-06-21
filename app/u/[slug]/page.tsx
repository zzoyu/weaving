import Image from "next/image";
import ButtonProfileLink from "./components/button-profile-link";
import { fetchProfileBySlug } from "./actions";
import { title } from "process";
import { Metadata, ResolvingMetadata } from "next";
import ProfileImage from "./components/profile-image";
import { createClient } from "@/utils/supabase/server";
import Information from "./components/information";

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
  console.log(currentUser.data.user?.id, data.user_id);

  return (
    <main className="flex flex-col justify-center items-center pt-16">
      <Information
        profile={data}
        isEditable={currentUser?.data?.user?.id === data.user_id}
      />
    </main>
  );
}
