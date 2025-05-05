"use client";

import { Notification } from "@/types/notification";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
interface ProfileBadgeProps {
  profile: Profile;
  notifications?: Notification[];
}

export default function ProfileBadge({
  profile,
  notifications,
}: ProfileBadgeProps) {
  console.log(profile);
  return (
    <Link className="relative" href="/notifications">
      <div className="relative w-10 h-10 dark:bg-slate-800 rounded-full overflow-hidden flex justify-center items-center border border-primary-100">
        <Image
          src={profile?.profile_image || ""}
          alt="프로필 이미지"
          width={20}
          height={20}
          className=" min-h-10 min-w-10"
        />
      </div>
      {(notifications?.length || 0) > 0 && (
        <div className="absolute top-0.5 right-0.5 z-10 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
      )}
    </Link>
  );
}
