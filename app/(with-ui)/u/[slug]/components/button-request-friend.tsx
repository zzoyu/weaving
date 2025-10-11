"use client";

import { AlertDialogConfirm } from "@/components/alert-dialog-confirm";
import { useToast } from "@/hooks/use-toast";
import {
  removeFriendByProfileId,
  requestFriendByProfileId,
  updateFriendAccepted,
} from "../actions";

export default function ButtonRequestFriend({
  isFriend,
  from,
  to,
  isApproved = false,
  isMyProfile = false,
  isMyRequest = false,
}: {
  isFriend: boolean;
  from: Profile;
  to: Profile;
  isApproved?: boolean;
  isMyProfile?: boolean;
  isMyRequest?: boolean;
}) {
  const toast = useToast();

  console.log(from, to);

  switch (true) {
    case isApproved && isFriend:
      return (
        <AlertDialogConfirm
          onConfirm={async () => {
            const { data, error } = await removeFriendByProfileId(
              from.id!,
              to.id!
            );
            if (error) {
              toast.toast({
                description: "오류가 발생했습니다. 다시 시도해주세요.",
              });
              return;
            }
            toast.toast({
              description: `친구를 삭제했습니다.`,
            });
          }}
          title="친구와의 관계를 해제하시겠습니까?"
          description=""
          actionText="삭제"
          cancelText="취소"
        >
          <button className="bg-green-500 button-request-friend mt-5">
            친구
          </button>
        </AlertDialogConfirm>
      );
    case !isApproved && !isFriend && !isMyProfile:
      return (
        <button
          className="bg-text-black dark:bg-background-muted text-white dark:text-text-black px-4 py-2 rounded-md mt-5 mb-5"
          onClick={() =>
            requestFriendByProfileId(from.id!, to.id!, {
              landing_url: `/u/${from.slug}`,
              content: `${from.nickname} 님이 친구 신청을 보냈습니다.`,
            })
          }
        >
          친구신청
        </button>
      );
    case !isApproved && isFriend && !isMyProfile && isMyRequest:
      return (
        <AlertDialogConfirm
          onConfirm={async () => {
            const { data, error } = await removeFriendByProfileId(
              from.id!,
              to.id!
            );
            if (error) {
              toast.toast({
                description: "오류가 발생했습니다. 다시 시도해주세요.",
              });
              return;
            }
            toast.toast({
              description: `친구 신청을 취소했습니다.`,
            });
          }}
          title="친구 신청을 취소하시겠습니까?"
          description=""
          actionText="삭제"
          cancelText="취소"
        >
          <button className="bg-gray-300 text-white dark:text-text-black px-4 py-2 rounded-md mt-5">
            친구신청중
          </button>
        </AlertDialogConfirm>
      );
    case !isApproved && isFriend && !isMyProfile && !isMyRequest:
      return (
        <div className="flex gap-2 mt-5 flex-col">
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={async () => {
                await updateFriendAccepted(from.id!, to.id!);

                toast.toast({
                  description: `${from.nickname} 님의 친구 신청을 수락했습니다.`,
                });
              }}
            >
              수락
            </button>

            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
              onClick={async () => {
                const { data, error } = await removeFriendByProfileId(
                  from.id!,
                  to.id!
                );
                if (error) {
                  toast.toast({
                    description: "오류가 발생했습니다. 다시 시도해주세요.",
                  });
                  return;
                }
                toast.toast({
                  description: `친구 신청을 거절했습니다.`,
                });
              }}
            >
              거절
            </button>
          </div>
        </div>
      );
    default:
      return null;
  }
}
