import { createClient } from "@/utils/supabase/server";
import { TabHeader } from "../components/tab-header";
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

  return (
    <main className="flex flex-col justify-center items-center pt-10 w-full md:max-w-[40rem] mx-auto gap-10">
      <TabHeader slug={params.slug} activeIndex={1} />
      <CharacterAddTemplate slug={params.slug} />
    </main>
  );
}
