import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { fetchRandomNicknameAndSlug } from "./actions";
import Onboarding from "./components/onboarding";

export default async function OnboardingPage() {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user?.id) {
    redirect("/signin");
  }
  const metadata = userData.user?.user_metadata as TwitterMetadata;

  // Auto generate nickname and slug.
  const { nickname, slug, candidates } = await fetchRandomNicknameAndSlug(
    metadata
  );

  console.log("Generated nickname and slug:", { nickname, slug });

  return (
    <Onboarding
      user={metadata}
      id={userData.user?.id as string}
      defaultProfile={{ nickname, slug }}
      candidateSlugSuffixes={candidates}
    />
  );
}
