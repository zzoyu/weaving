"use client";

import { deleteFriend, updateFriendAccepted } from "../actions";

export default function ButtonAcceptFriend({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  return (
    <div className="flex flex-row">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-5"
        onClick={() => {
          if (confirm("친구를 수락하시겠습니까?")) {
            updateFriendAccepted(from!, to!);
          }
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
