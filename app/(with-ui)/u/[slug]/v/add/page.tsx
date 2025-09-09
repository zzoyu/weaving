import { fetchPlanById } from "@/app/actions/plan";
import { fetchProfileBySlug } from "@/app/profile/actions";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { fetchCharactersByProfileId } from "../../actions";
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

  const plan = await fetchPlanById(profile.plan_id);
  if (!plan) {
    toast({
      title: "오류",
      description: "플랜 정보를 불러올 수 없습니다. 다시 시도해주세요.",
      variant: "destructive",
    });
    redirect("../");
  }

  return (
    <main className="flex flex-col justify-center items-center pt-10 w-full md:max-w-[40rem] mx-auto gap-10">
      <UniverseAddTemplate
        slug={params.slug}
        profileId={profile.id}
        characters={characters}
        plan={plan}
      />
    </main>
  );
}
