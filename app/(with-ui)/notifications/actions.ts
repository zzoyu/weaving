import { Notification } from "@/types/notification";
import { createClient } from "@/utils/supabase/server";

export async function fetchFriendRequestsByProfileId(id?: number) {
  if (!id) {
    throw new Error("id is required");
  }
  const supabase = await createClient();

  const { data: friendRequests, error } = await supabase
    .from("profile_friend")
    .select()
    .eq("to_profile_id", id)
    .is("is_approved", null)
    .order("id", { ascending: false });

  if (error) {
    throw error;
  }

  return { friendRequests };
}

export async function fetchHasNotificationsByProfileId(
  profileId?: number
): Promise<{ hasNotifications: boolean }> {
  if (!profileId) return { hasNotifications: false };
  const supabase = await createClient();

  const { data: notifications, error: notificationsError } = await supabase
    .from("notification")
    .select("id")
    .eq("to_profile_id", profileId)
    .limit(1);

  if (notificationsError) {
    throw notificationsError;
  }

  return { hasNotifications: Boolean(notifications?.length) };
}

export async function fetchNotificationsByProfileId(
  profileId?: number
): Promise<{ notifications: Notification[] }> {
  if (!profileId) return { notifications: [] };
  const supabase = await createClient();

  const { data: notifications, error: notificationsError } = await supabase
    .from("notification")
    .select("*")
    .eq("to_profile_id", profileId)
    // .or(`from_profile_id.eq.${profileId},to_profile_id.eq.${profileId}`)
    .order("created_at", { ascending: false });

  if (notificationsError) {
    throw notificationsError;
  }

  return { notifications };
}
