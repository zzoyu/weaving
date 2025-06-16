import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { fetchProfileByUserId } from "./actions";

export default async function ProfilePage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const metadata = data.user?.user_metadata as TwitterMetadata;

  const profileResponse = await fetchProfileByUserId(data.user?.id as string);
  if (profileResponse?.id !== undefined) {
    redirect(`/u/${profileResponse.slug}`);
  }

  redirect("/");

}
