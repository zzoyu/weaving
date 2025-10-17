import { fetchPlanById } from "@/app/actions/plan";
import { fetchProfileBySlug } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { fetchCharactersByProfileId } from "../../actions";
import { fetchUniversesByProfileId } from "../actions";
import UniverseAddTemplate from "./components/template";

export default async function NewUniversePage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user?.user?.id) {
    redirect("/");
  }

  const profile = await fetchProfileBySlug(params.slug);
  if (!profile?.id) {
    redirect("/");
  }

  const { data: characters } = await fetchCharactersByProfileId(profile.id);
  const universes = await fetchUniversesByProfileId(profile.id);

  const plan = await fetchPlanById(profile.plan_id);
  if (!plan || !universes) {
    redirect("../");
  }

  console.log("plan", plan);
  console.log(
    "universes",
    universes.length,
    "and plan limit",
    plan.limit.maxUniverseSlots
  );
  if ((universes.length || 0) >= plan.limit.maxUniverseSlots) {
    console.log("redirecting...");
    redirect(
      "../v?message=" +
        encodeURIComponent("세계관 생성 제한에 도달했습니다.") +
        "&success=false"
    );
  }

  return (
    <main className="flex flex-col justify-center items-center pt-10 w-full lg:max-w-[40rem] mx-auto gap-10">
      <UniverseAddTemplate
        slug={params.slug}
        profileId={profile.id}
        characters={characters}
        plan={plan}
      />
    </main>
  );
}
