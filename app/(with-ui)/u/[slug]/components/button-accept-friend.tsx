"use client";

import { useToast } from "@/hooks/use-toast";
import { deleteFriend, updateFriendAccepted } from "../actions";

export default function ButtonAcceptFriend({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  const { toast } = useToast();
  return (
    <div className="flex flex-row">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-5"
        onClick={async () => {
          const { error } = await updateFriendAccepted(from!, to!);
          if (error) {
            toast({
              description: "오류가 발생했습니다. 다시 시도해주세요.",
              variant: "destructive",
            });
            return;
          }
          toast({ description: "친구 신청을 수락했습니다." });
        }}
      >
        수락
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-5"
        onClick={async () => {
          const { error } = await deleteFriend(from!, to!);
          if (error) {
            toast({
              description: "오류가 발생했습니다. 다시 시도해주세요.",
              variant: "destructive",
            });
            return;
          }
          toast({ description: "친구 신청을 거절했습니다." });
        }}
      >
        거절
      </button>
    </div>
  );
}
