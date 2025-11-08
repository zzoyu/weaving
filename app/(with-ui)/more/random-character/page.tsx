import { fetchProfileByUserId } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Template from "./components/template";

export default async function RandomCharacterPage() {
  const user = await (await createClient()).auth.getUser();
  if (!user.data.user?.id) {
    redirect("/signin");
  }
  const profile = await fetchProfileByUserId(user.data.user?.id);
  if (!profile?.id) {
    redirect("/");
  }
  return (
    <div className="w-full lg:max-w-xl mx-auto py-8 px-4">
      <Template profile_id={profile.id} />
    </div>
  );
}
