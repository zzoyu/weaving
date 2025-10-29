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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { deleteUniverseById } from "../actions";

interface ButtonDeleteUniverseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  universeId: number;
}

export default function ButtonDeleteUniverse({
  universeId,
  children,
  ...props
}: ButtonDeleteUniverseProps) {
  const router = useRouter();
  const { toast } = useToast();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button {...props}>{children}</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>세계관를 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            세계관를 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteUniverseById(universeId)
                .then((result: boolean) => {
                  if (result) {
                    toast({
                      description: "세계관이 삭제되었습니다.",
                    });
                    router.replace("./");
                  }
                })
                .catch((error: Error) => {
                  toast({
                    description: "잠시 후 다시 시도해주세요.",
                    variant: "destructive",
                  });
                  console.error("Error deleting universe:", error);
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
