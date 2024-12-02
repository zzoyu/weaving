import { createClient } from "@/utils/supabase/server";
import {
  fetchFriendRequestsByProfileId,
  fetchNotificationsByProfileId,
} from "./actions";
import Link from "next/link";
import NotificationItem from "./components/notification-item";
import {
  deleteFriend,
  fetchProfilesByIds,
  updateFriendAccepted,
} from "../u/[slug]/actions";
import FriendRequestItem from "./components/friend-request-item";

export default async function NotificationsPage() {
  const supabase = createClient();

  const { data: currentUser, error: authError } = await supabase.auth.getUser();
  if (authError) {
    throw authError;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", currentUser?.user?.id)
    .single();

  if (profileError) {
    throw profileError;
  }

  const { notifications } = await fetchNotificationsByProfileId(profile.id);
  const { friendRequests } = await fetchFriendRequestsByProfileId(profile.id);

  const { requestedProfiles, error } = await fetchProfilesByIds(
    friendRequests.map((friendRequest) => friendRequest.from_profile_id)
  );

  return (
    <div>
      <h1>Notifications</h1>
      <div>
        <h2>친구신청</h2>
        <ul>
          {requestedProfiles.map((requestedProfile) => (
            <FriendRequestItem
              key={requestedProfile.id}
              profile={requestedProfile}
              onAccept={updateFriendAccepted}
              onReject={deleteFriend}
              to={profile.id}
            />
          ))}
        </ul>

        <h2>안읽은알림</h2>
        <ul>
          <li>
            {notifications.map((notification) => (
              <div key={notification.id}>
                <NotificationItem notification={notification} />
              </div>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
}
