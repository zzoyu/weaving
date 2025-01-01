import Image from "next/image";
import ProfileBadge from "./profile-badge";
import { fetchProfileById } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";
import { fetchNotificationsByProfileId } from "@/app/notifications/actions";
import Logo from "@/public/assets/logos/logo_text_horizontal_color.svg";
import Link from "next/link";
import MoreIcon from "@/public/assets/icons/more.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export async function Header() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const profile = await fetchProfileById(data?.user?.id as string);
  const { notifications } = await fetchNotificationsByProfileId(profile?.id);

  return (
    <header className="fixed top-0 flex h-10 md:h-14 w-full items-center justify-between px-2 md:px-8 bg-[#F4F4F4]">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Logo height={30} />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button className="p-1 border border-primary-100 rounded-full overflow-hidden w-10 h-10 flex items-center justify-center">
              <MoreIcon width={24} height={24} className="text-primary-300" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80"></PopoverContent>
        </Popover>
        {profile && (
          <ProfileBadge profile={profile} notifications={notifications} />
        )}
      </div>
    </header>
  );
}
