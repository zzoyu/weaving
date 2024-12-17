import ProfileEditForm from "./components/profile-edit-form";
import { fetchProfileBySlug } from "../actions";

export default async function EditPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data, error } = await fetchProfileBySlug(params.slug);

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      {data && <ProfileEditForm profile={data} />}
    </main>
  );
}
