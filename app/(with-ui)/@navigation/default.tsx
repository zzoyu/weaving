import { fetchProfileByUserId } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import { NavigationSignIn, NavigationSignOut } from "./components/navigation";

export default async function NavigationPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const responseProfile = await fetchProfileByUserId(data?.user?.id as string);

  const isSignin = !!data?.user?.id;

  if (!isSignin || !responseProfile || !responseProfile?.slug) {
    return <NavigationSignOut />;
  }

  return <NavigationSignIn slug={responseProfile?.slug} />;
}
