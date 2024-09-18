export interface Notification {
  id: number;
  created_at: string;
  content?: string;
  landing_url?: string;
  from_profile_id?: number;
  to_profile_id?: number;
  type?: "friend_request" | "system" | "character_weaved";
}
