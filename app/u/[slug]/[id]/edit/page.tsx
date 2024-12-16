import { fetchCharacter } from "../actions";
import EditForm from "./components/edit-form";

export default async function EditPage({
  params,
}: {
  params: { slug: string; id: number };
}) {
  // fetch the data from path params. [id] is the id of the item to edit
  const data = await fetchCharacter(params.id);

  if (!data) {
    throw { message: "Data not found" };
  }

  return (
    <main>
      <h1>{data?.name}</h1>
      <EditForm data={data} />
    </main>
  );
}
