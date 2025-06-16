import { fetchNotificationsByProfileId } from "@/app/(with-ui)/notifications/actions";
import { fetchProfileByUserId } from "@/app/profile/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Logo from "./logo";
import ProfileBadge from "./profile-badge";

export default async function Header() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const profile = await fetchProfileByUserId(data?.user?.id as string);
  const { notifications } = await fetchNotificationsByProfileId(profile?.id);

  return (
    <header className="fixed top-0 flex h-14 w-full items-center justify-between px-2 md:px-8 bg-background-default dark:bg-neutral-900">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {profile && (
          <Dialog>
            <DialogTrigger className="focus:outline-none">
              <ProfileBadge profile={profile} notifications={notifications} />
            </DialogTrigger>
            <DialogContent className="w-full h-full flex flex-col items-start justify-start gap-4 p-4 pt-20 md:max-h-fit max-w-full md:max-w-lg">
              <DialogTitle className="hidden">메뉴</DialogTitle>
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
