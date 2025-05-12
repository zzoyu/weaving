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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ButtonDeleteProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  characterId: number;
}

export default function ButtonDelete({
  characterId,
  children,
  ...props
}: ButtonDeleteProps) {
  const router = useRouter();
  const { toast } = useToast();
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
              deleteCharacterById(characterId)
                .then((result) => {
                  if (result) {
                    toast({
                      title: "캐릭터 삭제",
                      description: "캐릭터가 삭제되었습니다.",
                    });
                    router.replace("/profile");
                  }
                })
                .catch((error) => {
                  toast({
                    title: "캐릭터 삭제 실패",
                    description: "잠시 후 다시 시도해주세요.",
                    variant: "destructive",
                  });
                  console.error("Error deleting character:", error);
                });
            }}
          >
            계속
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
