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
    <div className="relative">
      {(notifications?.length || 0) > 0 && (
        <div className="absolute top-0.5 right-0.5 z-50 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
      )}
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={profile?.profile_image || ""}
          alt="프로필 이미지"
          className="z-10"
        />
        <Skeleton className="h-full w-full rounded-full"></Skeleton>
      </Avatar>
    </div>
  );
}
