"use client";

import { removeFriendByProfileId, requestFriendByProfileId } from "../actions";

export default function ButtonRequestFriend({
  isFriend,
  from,
  to,
  isApproved = false,
  isMine = false,
}: {
  isFriend: boolean;
  from: Profile;
  to: Profile;
  isApproved?: boolean;
  isMine?: boolean;
}) {
  return (
    <>
      {isApproved ? (
        <button
          className="bg-green-500 button-request-friend"
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
      ) : !isMine ? (
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
      ) : (
        <div className="flex gap-2 mt-5 flex-col">
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                if (confirm("친구 신청을 수락하시겠습니까?")) {
                  requestFriendByProfileId(from.id!, to.id!, {
                    landing_url: `/u/${from.slug}`,
                    content: `${from.nickname} 님이 친구 신청을 수락했습니다.`,
                  });
                }
              }}
            >
              수락
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                if (confirm("친구 신청을 거절하시겠습니까?")) {
                  removeFriendByProfileId(from.id!, to.id!);
                }
              }}
            >
              거절
            </button>
          </div>
        </div>
      )}
    </>
  );
}
