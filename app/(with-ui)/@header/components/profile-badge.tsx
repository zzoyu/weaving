"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Notification } from "@/types/notification";

interface ProfileBadgeProps {
  profile: Profile;
  notifications?: Notification[];
}

export default function ProfileBadge({
  profile,
  notifications,
}: ProfileBadgeProps) {
  return (
    <Avatar>
      {(notifications?.length || 0) > 0 && (
        <div className="absolute top-0.5 right-0.5 z-10 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
      )}
      <AvatarImage src={profile?.profile_image || ""} alt="프로필 이미지" />
      <Skeleton className="h-full w-full rounded-full" />
    </Avatar>
  );
}
