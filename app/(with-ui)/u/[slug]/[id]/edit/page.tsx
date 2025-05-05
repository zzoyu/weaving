import { createClient } from "@/utils/supabase/server";
import { fetchCharacter, fetchRelationships } from "../actions";
import EditForm from "./components/edit-form";

export default async function EditPage({
  params,
}: {
  params: { slug: string; id: number };
}) {
  const supabase = createClient();
  const currentUser = await supabase.auth.getUser();
  if (!currentUser?.data?.user) {
    throw new Error("User not found");
  }

  const data = await fetchCharacter(params.id);

  const relationships = await fetchRelationships(params.id);

  if (!data) {
    throw new Error("Character not found");
  }

  return (
    <main>
      {data && (
        <EditForm character={data} relationships={relationships || []} />
      )}
    </main>
  );
}
