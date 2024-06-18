import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function PublicProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  if (!slug) throw { message: "Slug not found" };

  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (
    <main className="flex flex-col justify-center items-center pt-16 gap-16">
      <h2>프로필</h2>
      <p className="text-center text-gray-500">
        이 페이지는 공개 프로필 페이지입니다.
      </p>
      <p>{data?.slug}</p>
      <p>{data?.nickname}</p>
      <p>{data?.profile_url}</p>/
    </main>
  );
}
