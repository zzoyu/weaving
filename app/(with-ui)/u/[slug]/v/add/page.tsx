import { fetchProfileBySlug } from "@/app/profile/actions";
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

  return (
    <main className="flex flex-col justify-center items-center pt-10 w-full md:max-w-[40rem] mx-auto gap-10">
      <UniverseAddTemplate 
        slug={params.slug} 
        profileId={profile.id}
        characters={characters}
      />
    </main>
  );
}
