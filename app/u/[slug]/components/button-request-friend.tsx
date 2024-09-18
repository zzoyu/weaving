"use client";

import { removeFriendByProfileId, requestFriendByProfileId } from "../actions";

export default function ButtonRequestFriend({
  isFriend,
  from,
  to,
  isApproved = false,
}: {
  isFriend: boolean;
  from: Profile;
  to: Profile;
  isApproved?: boolean;
}) {
  return (
    <>
      {isApproved ? (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-5"
          onClick={() => {
            if (confirm("친구를 삭제하시겠습니까?")) {
              removeFriendByProfileId(from.id!, to.id!);
            }
          }}
        >
          친구
        </button>
      ) : !isFriend ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-5"
          onClick={() =>
            requestFriendByProfileId(from.id!, to.id!, {
              landing_url: `/u/${from.slug}`,
              content: `${from.nickname} 님이 친구 신청을 보냈습니다.`,
            })
          }
        >
          친구신청
        </button>
      ) : (
        <button
          className="bg-gray-300 text-white px-4 py-2 rounded-md mt-5"
          onClick={() => {
            if (confirm("친구 신청을 취소하시겠습니까?")) {
              removeFriendByProfileId(from.id!, to.id!);
            }
          }}
        >
          친구신청중
        </button>
      )}
    </>
  );
}
