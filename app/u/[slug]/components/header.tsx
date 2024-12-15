import Image from "next/image";
import ProfileBadge from "./profile-badge";
import { fetchProfileById } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import { fetchNotificationsByProfileId } from "@/app/notifications/actions";
import Logo from "@/public/assets/logos/logo_text_horizontal_color.svg";

export async function Header() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const profile = await fetchProfileById(data?.user?.id as string);
  const { notifications } = await fetchNotificationsByProfileId(profile?.id);

  console.log("profile", profile);

  return (
    <header className="fixed top-0 flex h-14 w-full items-center justify-between px-8 bg-[#F4F4F4]">
      <div className="flex items-center justify-center">
        <Logo height={30} />
      </div>
      <div></div>
      {profile && (
        <ProfileBadge profile={profile} notifications={notifications} />
      )}
    </header>
  );
}
