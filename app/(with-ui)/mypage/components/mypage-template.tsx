import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ButtonDelete from "./button-delete";
import ButtonLogout from "./button-logout";
import FeedbackButton from "./feedback-button";
import ListFriend from "./list-friend";
import ProfileEditForm from "./profile-edit-form";

export default function MypageTemplate({ profile }: { profile: Profile }) {
  return (
    <main className="flex flex-col items-center justify-start w-full h-full pt-10">
      <section className="w-full max-w-md p-4 bg-white dark:bg-neutral-900 rounded">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">접속 중인 계정</h2>
          <ProfileEditForm profile={profile} />
        </div>
        <ListFriend profile={profile} />
        <div className="mb-4 flex flex-col">
          <Separator className="my-2" />
          <ButtonLogout />
          <Separator className="my-2" />
          <ButtonDelete userId={profile.user_id} />
        </div>
      </section>

      <div className="flex flex-row items-center justify-center w-full max-w-md p-4">
        <Link href="/term" className="text-xs text-gray-500">
          이용약관
        </Link>
        <Separator className="mx-2" orientation="vertical" />
        <Link href="/privacy" className="text-xs text-gray-500">
          개인정보처리방침
        </Link>
        <Separator className="mx-2" orientation="vertical" />
        <Link href="/guideline" className="text-xs text-gray-500">
          컨텐츠가이드라인
        </Link>
      </div>

      <FeedbackButton />
    </main>
  );
}
