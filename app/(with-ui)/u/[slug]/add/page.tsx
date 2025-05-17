import { fetchProfileByUserId } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import CharacterAddTemplate from "./components/template";

export default async function NewCharacterPage({
  params,
}: {
  params: { slug: string };
}) {
  // if not logged in, redirect to login page.
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.getUser();

  // if not my profile, redirect to profile page
  const myProfile = await fetchProfileByUserId(user?.user?.id as string);

  if (!myProfile) {
    throw new Error("로그인된 사용자가 아닙니다.");
  }

  if (myProfile.slug !== params.slug) {
    throw new Error("자신의 프로필이 아닙니다.");
  }

  return (
    <main className="flex flex-col justify-center items-center pt-10 w-full md:max-w-[40rem] mx-auto gap-10">
      {myProfile.id && (
        <CharacterAddTemplate slug={params.slug} profileId={myProfile.id} />
      )}
    </main>
  );
}
