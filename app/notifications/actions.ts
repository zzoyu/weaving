import { Notification } from "@/types/notification";
import { createClient } from "@/utils/supabase/server";

export async function fetchFriendRequestsByProfileId(id: number) {
  const supabase = createClient();

  const { data: friendRequests, error } = await supabase
    .from("profile_friend")
    .select()
    .eq("to_profile_id", id)
    .is("is_approved", null)
    .order("id", { ascending: false });

  console.log(friendRequests);

  if (error) {
    throw error;
  }

  return { friendRequests };
}

export async function fetchNotificationsByProfileId(
  profileId: number
): Promise<{ notifications: Notification[] }> {
  if (!profileId) return { notifications: [] };
  const supabase = createClient();

  const { data: notifications, error: notificationsError } = await supabase
    .from("notification")
    .select("*")
    .or(`from_profile_id.eq.${profileId},to_profile_id.eq.${profileId}`)
    .order("created_at", { ascending: false });

  if (notificationsError) {
    throw notificationsError;
  }

  return { notifications };
}
