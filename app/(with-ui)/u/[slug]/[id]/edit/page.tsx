import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
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
    redirect("/");
  }

  const data = await fetchCharacter(params.id);
  if (!data) {
    notFound();
  }
  const colorProperties = data?.properties?.filter(
    (property) => property.type === "color"
  );

  data.properties = data?.properties?.filter(
    (property) => property.type !== "color"
  );

  const relationships = await fetchRelationships(params.id);

  return (
    <main>
      {data && (
        <EditForm
          character={data}
          colors={colorProperties}
          relationships={relationships || []}
        />
      )}
    </main>
  );
}
