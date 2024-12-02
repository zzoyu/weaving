interface Profile {
  id?: number;
  user_id: string;
  nickname: string;
  slug: string;
  created_at?: string;
  profile_image?: string;
}

interface Friend {
  id?: number;
  from_profile_id?: number;
  to_profile_id?: number;
  is_approved?: boolean;
  created_at?: string; // timestamp
}
