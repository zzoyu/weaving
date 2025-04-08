"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { clearCharacterPassword } from "../actions";

export function ButtonUnlock({ characterId }: { characterId: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="text-base text-gray-700 hover:text-primary-500"
          onClick={() => setIsOpen(true)}
        >
          캐릭터 잠금 해제
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          action={(formData) => {
            clearCharacterPassword(formData);
            setIsOpen(false);
          }}
        >
          <input type="hidden" name="character_id" value={characterId} />
          <AlertDialogHeader>
            <AlertDialogTitle>잠금을 해제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              비밀번호가 제거되면 모든 사용자가 캐릭터를 열람할 수 있습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>아니오</AlertDialogCancel>
            <AlertDialogAction>네</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
