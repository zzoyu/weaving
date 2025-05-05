import { fetchProfileByUserId } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import { fetchNotificationsByProfileId } from "@/app/(with-ui)/notifications/actions";
import Logo from "@/public/assets/logos/logo_text_horizontal_color.svg";
import Link from "next/link";
import ProfileBadge from "./profile-badge";

export default async function Header() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const profile = await fetchProfileByUserId(data?.user?.id as string);
  const { notifications } = await fetchNotificationsByProfileId(profile?.id);

  return (
    <header className="fixed top-0 flex h-14 w-full items-center justify-between px-2 md:px-8 bg-[#F4F4F4]">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Logo height={30} />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {profile && (
          <ProfileBadge profile={profile} notifications={notifications} />
        )}
      </div>
    </header>
  );
}
