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
  const toast = useToast();
  return (
    <div className="flex flex-row">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-5"
        onClick={async () => {
          await updateFriendAccepted(from!, to!);
        }}
      >
        수락
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-5"
        onClick={() => {
          if (confirm("친구를 거절하시겠습니까?")) {
            deleteFriend(from!, to!);
          }
        }}
      >
        거절
      </button>
    </div>
  );
}
