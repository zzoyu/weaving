"use client";
import { deleteCharacterById } from "@/app/(with-ui)/@header/(profile)/u/[slug]/[id]/actions";
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
import { Character } from "@/types/character";
import { ReactNode } from "react";

interface ButtonDeleteProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  data: Character;
}

export default function ButtonDelete({
  data,
  children,
  ...props
}: ButtonDeleteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button {...props}>{children}</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>캐릭터를 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            캐릭터를 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteCharacterById(data.id);
            }}
          >
            계속
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
