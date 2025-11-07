import { fetchProfileByUserId } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { fetchRandomNicknameAndSlug } from "./actions";
import Onboarding from "./components/onboarding";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user?.id) {
    redirect("/signin");
  }
  if (await fetchProfileByUserId(userData.user.id)) {
    redirect(`/u/${(await fetchProfileByUserId(userData.user.id))?.slug}`);
  }
  const metadata = userData.user?.user_metadata as TwitterMetadata;

  // Auto generate nickname and slug.
  const { nickname, slug } = await fetchRandomNicknameAndSlug(metadata);

  return (
    <Onboarding
      user={metadata}
      id={userData.user?.id as string}
      defaultProfile={{ nickname, slug }}
    />
  );
}
