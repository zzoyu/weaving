import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmButton({
  nickname,
  onConfirm,
}: {
  nickname?: string;
  onConfirm?: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" type="button" size="lg">
          저장하기
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle className="text-lg font-medium text-center">
          닉네임을 변경하시겠습니까?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center">
          [{nickname}](으)로 변경합니다.
          <br />
          닉네임은 30일에 한 번만 변경할 수 있습니다.
          <br />
          <span className="text-xs text-gray-400">
            다음 변경 가능일:{" "}
            {new Intl.DateTimeFormat("ko-KR", {
              dateStyle: "long",
              timeZone: "Asia/Seoul",
            }).format(
              new Date(
                new Date().setDate(new Date().getDate() + 30) // 30일 후
              )
            )}
          </span>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex-row gap-2">
          <AlertDialogCancel className="w-full mt-0">취소</AlertDialogCancel>
          <AlertDialogAction
            className="w-full"
            form="nickname-form"
            type="submit"
            onClick={() => {
              onConfirm?.();
            }}
          >
            변경하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
