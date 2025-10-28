"use client";

import OverlayLoading from "@/components/overlay-loading";
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
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { clearCharacterPassword } from "../actions";

export function ButtonUnlock({ characterId }: { characterId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className="context-menu-item" onClick={() => setIsOpen(true)}>
          캐릭터 잠금 해제
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form>
          <input type="hidden" name="character_id" value={characterId} />
          <AlertDialogHeader>
            <AlertDialogTitle>잠금을 해제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              비밀번호가 제거되면 모든 사용자가 캐릭터를 열람할 수 있습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>아니오</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const formData = new FormData();
                formData.append("character_id", characterId.toString());
                setIsSubmitting(true);
                clearCharacterPassword(formData)
                  .then(() => {
                    toast({
                      description: "캐릭터가 잠금 해제되었습니다.",
                    });
                  })
                  .finally(() => {
                    setIsOpen(false);
                    setIsSubmitting(false);
                  });
              }}
            >
              네
            </AlertDialogAction>
          </AlertDialogFooter>
          {isSubmitting ? (
            <OverlayLoading message="잠금 해제 중입니다..." />
          ) : null}
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
