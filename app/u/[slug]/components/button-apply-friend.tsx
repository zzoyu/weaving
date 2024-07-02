"use client";

import { applyFriend, removeFriend } from "../actions";

export default function ButtonApplyFriend({
  isFriend,
  toId,
  fromId,
  isApproved = false,
}: {
  isFriend: boolean;
  toId: number;
  fromId: number;
  isApproved?: boolean;
}) {
  return (
    <>
      {isApproved ? (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-5"
          onClick={() => {
            if (confirm("친구를 삭제하시겠습니까?")) {
              removeFriend(fromId, toId);
            }
          }}
        >
          친구
        </button>
      ) : !isFriend ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-5"
          onClick={() => applyFriend(fromId, toId)}
        >
          친구신청
        </button>
      ) : (
        <button
          className="bg-gray-300 text-white px-4 py-2 rounded-md mt-5"
          onClick={() => {
            if (confirm("친구신청을 취소하시겠습니까?")) {
              removeFriend(fromId, toId);
            }
          }}
        >
          친구신청중
        </button>
      )}
    </>
  );
}
