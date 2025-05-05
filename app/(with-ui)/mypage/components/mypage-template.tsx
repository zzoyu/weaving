"use client";

import { createClient } from "@/utils/supabase/client";
import ProfileEditForm from "./profile-edit-form";
import { AlertDialogConfirm } from "@/components/alert-dialog-confirm";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { deleteAccount } from "../actions";
import { useRouter } from "next/navigation";

export default function MypageTemplate({ profile }: { profile: Profile }) {
  const router = useRouter();

  function handleLogout() {
    const client = createClient();
    client.auth.signOut().then(() => {
      window.location.href = "/";
    });
  }

  return (
    <main className="flex flex-col items-center justify-start w-full h-full pt-10">
      <section className="w-full max-w-md p-4 bg-white rounded">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">접속 중인 계정</h2>
          <ProfileEditForm profile={profile} />
        </div>
        <div className="mb-4 flex flex-col">
          <button className="w-full px-4 py-2" onClick={handleLogout}>
            로그아웃
          </button>
          <Separator className="my-2" />
          <AlertDialogConfirm
            onConfirm={async () => {
              await deleteAccount(profile.user_id);
              router.replace("/");
            }}
            title="정말 탈퇴하시겠습니까?"
            description="탈퇴 후에는 모든 데이터가 삭제됩니다."
            actionText="탈퇴하기"
          >
            <button className="w-full px-4 py-2 rounded">회원탈퇴</button>
          </AlertDialogConfirm>
        </div>
      </section>

      <div className="flex flex-row items-center justify-center w-full max-w-md p-4">
        <Link href="/term" className="text-sm text-gray-500">
          이용약관
        </Link>
        <Separator className="mx-2" orientation="vertical" />
        <Link href="/privacy" className="text-sm text-gray-500">
          개인정보처리방침
        </Link>
      </div>
    </main>
  );
}
