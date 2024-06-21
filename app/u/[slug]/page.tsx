import Image from "next/image";
import ButtonProfileLink from "./components/button-profile-link";
import { fetchProfile } from "./actions";
import { title } from "process";
import { Metadata, ResolvingMetadata } from "next";

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

  const { data, error } = await fetchProfile(slug);

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

  const { data, error } = await fetchProfile(slug);

  if (error) {
    throw error;
  }

  return (
    <main className="flex flex-col justify-center items-center pt-16">
      <h1 className="text-xl mb-5">{data.nickname}</h1>
      <div className="w-20 h-20 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
        {data.profile_image && (
          <Image
            src={data.profile_image}
            alt={data.nickname}
            width={200}
            height={200}
          />
        )}
      </div>
      <p className="text-profile-twitter">weaving@{data?.slug}</p>
      <p>{data?.nickname}</p>
    </main>
  );
}
