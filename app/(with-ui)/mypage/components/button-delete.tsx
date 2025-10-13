"use client";

import { AlertDialogConfirm } from "@/components/alert-dialog-confirm";
import { redirect } from "next/navigation";
import { deleteAccount } from "../actions";

export default function ButtonDelete({ userId }: { userId: string }) {
  return (
    <AlertDialogConfirm
      onConfirm={async () => {
        await deleteAccount(userId);
        redirect("/");
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
