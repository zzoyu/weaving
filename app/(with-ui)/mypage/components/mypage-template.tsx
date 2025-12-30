import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ButtonDelete from "./button-delete";
import ButtonLogout from "./button-logout";
import ProfileEditForm from "./profile-edit-form";

export default async function MypageTemplate({ profile, friends }: { profile: Profile, friends: Friend[] }) {

  return (
    <main className="flex flex-col items-center justify-start w-full h-full pt-0">
      <section className="w-full max-w-md p-4">
        <div className="mb-4">
          <ProfileEditForm profile={profile} friends={friends} />
        </div>
        <div className="mb-4 flex flex-col">
          <Link href={"/help"} className="w-full px-4 py-2 text-center">
            도움센터
          </Link>
          <Separator className="my-2" />
        <ButtonLogout />
        <Separator className="my-2" />
        <ButtonDelete userId={profile.user_id} />
        </div>
      </section>

      <div className="flex flex-row items-center justify-center w-full max-w-md p-4">
        <Link href="/terms" className="text-xs text-gray-500">
          이용약관
        </Link>
        <Separator className="mx-2" orientation="vertical" />
        <Link href="/privacy" className="text-xs text-gray-500">
          개인정보처리방침
        </Link>
        <Separator className="mx-2" orientation="vertical" />
        <Link href="/guideline" className="text-xs text-gray-500">
          콘텐츠가이드라인
        </Link>
      </div>
    </main>
  );
}
