import { fetchNotificationsByProfileId } from "@/app/(with-ui)/notifications/actions";
import { fetchProfileByUserId } from "@/app/profile/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Logo from "@/public/assets/logos/logo_text_horizontal_color.svg";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ProfileBadge from "./profile-badge";

export default async function Header() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const profile = await fetchProfileByUserId(data?.user?.id as string);
  const { notifications } = await fetchNotificationsByProfileId(profile?.id);

  return (
    <header className="fixed top-0 flex h-14 w-full items-center justify-between px-2 md:px-8 bg-background-default">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Logo height={30} />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {profile && (
          <Dialog>
            <DialogTrigger className="focus:outline-none">
              <ProfileBadge profile={profile} notifications={notifications} />
            </DialogTrigger>
            <DialogContent className="w-full h-full flex flex-col items-start justify-start gap-4 p-4 pt-8 md:max-h-fit max-w-full md:max-w-lg">
              <Link href={"/notifications"} passHref legacyBehavior>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg"
                  size={"lg"}
                >
                  알림
                </Button>
              </Link>
              <Link href={"/notifications/notice"} passHref legacyBehavior>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg"
                  size={"lg"}
                >
                  공지
                </Button>
              </Link>
              <Link href={"/mypage/friend"} passHref legacyBehavior>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg"
                  size={"lg"}
                >
                  친구
                </Button>
              </Link>
              <Link href={"/logout"} passHref legacyBehavior>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg"
                  size={"lg"}
                >
                  로그아웃
                </Button>
              </Link>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </header>
  );
}
