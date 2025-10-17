import { fetchCurrentPlanUsage, fetchPlanById } from "@/app/actions/plan";
import { fetchProfileByUserId } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
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
    redirect("/");
  }

  if (myProfile.slug !== params.slug) {
    redirect("/");
  }

  const userPlan = await fetchPlanById(myProfile.plan_id as number);
  const userCurrentUsage = await fetchCurrentPlanUsage(myProfile.id as number, [
    "character",
  ]);

  if (
    !userPlan ||
    userPlan.limit.maxCharacterSlots <= (userCurrentUsage?.characterCount || 0)
  ) {
    redirect(
      "./?message=" +
        encodeURIComponent("캐릭터 생성 제한에 도달했습니다.") +
        "&success=false"
    );
  }

  return (
    <main className="flex flex-col justify-center items-center pt-10 w-full lg:max-w-[40rem] mx-auto gap-10">
      <CharacterAddTemplate
        slug={params.slug}
        profileId={myProfile.id as number}
        planLimit={userPlan.limit}
      />
    </main>
  );
}
