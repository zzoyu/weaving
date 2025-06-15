import { fetchNotificationsByProfileId } from "@/app/(with-ui)/notifications/actions";
import { fetchProfileByUserId } from "@/app/profile/actions";
import Logo from "@/public/assets/logos/logo_text_horizontal_color.svg";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ProfileBadge from "../../../@header/components/profile-badge";

export async function Header() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const profile = await fetchProfileByUserId(data?.user?.id as string);
  const { notifications } = await fetchNotificationsByProfileId(profile?.id);

  return (
    <header className="fixed top-0 flex h-10 md:h-14 w-full items-center justify-between px-2 md:px-8 bg-background-default">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Logo height={30} />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {/* {isMine && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-1 border border-primary rounded-full overflow-hidden w-10 h-10 flex items-center justify-center">
                <MoreIcon width={24} height={24} className="text-primary-300" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="flex flex-col gap-2 p-4 justify-start items-start">
                <Link
                  href="edit"
                  className="text-base text-gray-700 hover:text-primary-500"
                >
                  프로필 설정
                </Link>
                <ButtonShare className="text-base text-gray-700 hover:text-primary-500">
                  프로필 공유
                </ButtonShare>
                <ButtonDelete className="text-base text-gray-700 hover:text-primary-500">
                  프로필 삭제
                </ButtonDelete>
              </div>
            </PopoverContent>
          </Popover>
        )} */}
        {profile && (
          <ProfileBadge profile={profile} notifications={notifications} />
        )}
      </div>
    </header>
  );
}
