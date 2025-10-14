"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { handleUpdateNickname } from "../actions";
import ConfirmButton from "./confirm-button";

export default function NicknameTemplate({
  nickname,
  lastChangedAt,
}: {
  nickname?: string;
  lastChangedAt?: Date;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string>(nickname || "");
  const [currentChangedAt, setCurrentChangedAt] = useState<Date | null>(
    lastChangedAt || null
  );
  const formRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast();

  return (
    <form
      className="w-full h-full p-8 flex flex-col justify-between"
      action={async (formData) => {
        if (formData.get("nickname")?.toString().trim() === nickname) {
          toast({
            description: "변경된 닉네임이 없습니다.",
            variant: "destructive",
          });
          return;
        }
        const res = await handleUpdateNickname(formData);
        if (res.success && res.nickname) {
          setCurrentChangedAt(res.lastChangedAt || null);
          setNewNickname(res.nickname);
          setIsSuccess(true);
          setIsFailed(false);
        } else {
          setIsFailed(true);
          setIsSuccess(false);
        }
      }}
      name="nickname-form"
      id="nickname-form"
      ref={formRef}
    >
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium">
          위빙에서 사용하실
          <br />
          닉네임을 입력해 주세요
        </p>
        <Input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력하세요"
          className="mt-2"
          maxLength={10}
          minLength={1}
          required
          pattern="^[가-힣a-zA-Z0-9\s]+$"
          onChange={(e) => setNewNickname(e.target.value)}
          value={newNickname}
        />

        <div className="w-full flex flex-col">
          <p className="text-sm text-neutral-400 mt-2">
            • 닉네임은 국문, 영문, 숫자만 입력 가능합니다 (특수문자 사용 불가)
          </p>
          <p className="text-sm text-neutral-400">
            • 닉네임은 25자 이내로 작성 가능합니다
          </p>
        </div>
      </div>
      <ConfirmButton
        nickname={newNickname}
        onConfirm={() => {
          const f = formRef.current;
          if (!f) return;
          if (typeof f.requestSubmit === "function") f.requestSubmit();
          else f.submit();
        }}
      />
      {(isSuccess || isFailed) && (
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogTitle className="text-lg font-medium text-center">
              {isSuccess
                ? "닉네임이 변경되었습니다"
                : "닉네임을 변경할 수 없습니다"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {isSuccess
                ? "닉네임이 성공적으로 변경되었습니다.\n다음 닉네임 변경은 30일 후에 가능합니다."
                : "닉네임 변경에 실패했습니다. 다시 시도해주세요."}

              {currentChangedAt && (
                <span className="text-xs text-gray-400 block mt-2">
                  다음 변경 가능일:{" "}
                  {new Intl.DateTimeFormat("ko-KR", {
                    dateStyle: "long",
                    timeZone: "Asia/Seoul",
                  }).format(
                    new Date(currentChangedAt).setDate(
                      new Date(currentChangedAt).getDate() + 30
                    ) // 30일 후
                  )}
                </span>
              )}
            </AlertDialogDescription>
            <AlertDialogFooter className="flex-row gap-2">
              <AlertDialogAction
                className="w-full"
                onClick={() => {
                  setIsSuccess(false);
                  setIsFailed(false);
                }}
              >
                닫기
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </form>
  );
}
