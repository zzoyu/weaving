"use client";

import { AlertDialogConfirm } from "@/components/alert-dialog-confirm";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { deleteAccount } from "../actions";

export default function ButtonDelete({ userId }: { userId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  return (
    <AlertDialogConfirm
      onConfirm={async () => {
        const { success } = await deleteAccount(userId);
        if (!success) {
          return;
        }
        toast({
          title: "회원탈퇴가 완료되었습니다.",
          description: "이용해주셔서 감사합니다.",
        });
        const client = createClient();
        await client.auth.signOut();
        router.replace("/");
      }}
      title="정말 탈퇴하시겠습니까?"
      description="탈퇴 후에는 모든 데이터가 삭제됩니다."
      actionText="탈퇴하기"
      cancelText="취소"
    >
      <button className="w-full px-4 py-2 rounded">회원탈퇴</button>
    </AlertDialogConfirm>
  );
}
