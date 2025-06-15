"use client";
import { deleteUniverseById } from "@/app/(with-ui)/u/[slug]/v/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./ui/button";

interface ButtonDeleteUniverseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start text-base text-gray-700 hover:text-destructive">
          {children || "세계관 삭제"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>세계관을 삭제하시겠습니까?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteUniverseById(universeId)
                .then((result) => {
                  if (result) {
                    toast({
                      description: "세계관이 삭제되었습니다.",
                    });
                    router.replace("./");
                  }
                })
                .catch((error) => {
                  toast({
                    description: "잠시 후 다시 시도해주세요.",
                    variant: "destructive",
                  });
                  console.error("Error deleting universe:", error);
                });
            }}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 