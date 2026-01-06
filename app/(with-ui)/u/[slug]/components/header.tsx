import { fetchNotificationsByProfileId } from "@/app/(with-ui)/notifications/actions";
import { fetchProfileByUserId } from "@/app/profile/actions";
import Logo from "@/public/assets/logos/logo_text_horizontal_color.svg";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ProfileBadge from "../../../@header/components/profile-badge";

export async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const profile = await fetchProfileByUserId(data?.user?.id as string);
  const { notifications } = await fetchNotificationsByProfileId(profile?.id);

  return (
    <header className="fixed top-0 flex h-10 lg:h-14 w-full items-center justify-between px-2 lg:px-8 bg-background-default dark:bg-neutral-900">
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
