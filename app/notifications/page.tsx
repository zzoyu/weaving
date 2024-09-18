import { createClient } from "@/utils/supabase/server";
import {
  fetchFriendRequestsByProfileId,
  fetchNotificationsByProfileId,
} from "./actions";
import Link from "next/link";

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

  console.log(friendRequests);

  return (
    <div>
      <h1>Notifications</h1>
      <div>
        <h2>친구신청</h2>
        <ul>
          {friendRequests.map((friendRequest) => JSON.stringify(friendRequest))}
        </ul>

        <h2>안읽은알림</h2>
        <ul>
          <li>
            {notifications.map((notification) => (
              <div key={notification.id}>
                <Link href={notification.landing_url}>
                  {notification.content}
                </Link>
              </div>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
}
