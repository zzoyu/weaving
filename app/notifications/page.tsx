import { createClient } from "@/utils/supabase/server";
import {
  fetchFriendRequestsByProfileId,
  fetchNotificationsByProfileId,
} from "./actions";
import NotificationItem from "./components/notification-item";
import {
  deleteFriend,
  fetchProfilesByIds,
  updateFriendAccepted,
} from "../u/[slug]/actions";
import FriendRequestItem from "./components/friend-request-item";
import { fetchProfileByUserId } from "../profile/actions";
import ButtonBack from "./components/button-back";
import { TabHeader } from "../u/[slug]/components/tab-header";
import { redirect } from "next/navigation";

export default async function NotificationsPage({}: {}) {
  const supabase = await createClient();

  const { data: currentUser, error: authError } = await supabase.auth.getUser();
  if (authError) {
    throw authError;
  }

  const profile = await fetchProfileByUserId(currentUser?.user?.id as string);
  if (!profile) {
    throw new Error(`해당하는 프로필을 찾을 수 없습니다.`);
  }

  if (currentUser?.user?.id !== profile?.user_id) {
    throw new Error("자신의 프로필이 아닙니다.");
  }

  if (!currentUser?.user?.id) {
    redirect("/");
  }

  const { notifications } = await fetchNotificationsByProfileId(profile.id);
  const { friendRequests } = await fetchFriendRequestsByProfileId(profile.id);

  const { requestedProfiles, error } = await fetchProfilesByIds(
    friendRequests.map((friendRequest) => friendRequest.from_profile_id)
  );

  return (
    <main className="flex flex-col justify-start pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto h-full">
      <div className="fixed top-0 w-full flex p-4">
        <h2 className="flex gap-2 items-center">
          <ButtonBack />
          알림
        </h2>
      </div>
      <div className="p-4">
        <div>
          <TabHeader
            activeIndex={0}
            data={[
              {
                title: "활동",
                href: "/notifications",
                isNew: notifications?.length > 0,
              },
              { title: "공지", href: "/notifications/notice", isNew: true },
            ]}
          />
          <ul>
            {requestedProfiles.map((requestedProfile) => (
              <FriendRequestItem
                key={requestedProfile.id}
                profile={requestedProfile as Profile}
                onAccept={updateFriendAccepted}
                onReject={deleteFriend}
                to={profile.id}
              />
            ))}
          </ul>

          <ul>
            <li>
              {notifications.length ? (
                notifications.map((notification) => (
                  <div key={notification.id}>
                    <NotificationItem notification={notification} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 p-10">알림이 없습니다.</p>
              )}
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
