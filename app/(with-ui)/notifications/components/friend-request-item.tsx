"use client";

import Image from "next/image";
import Link from "next/link";

export default function FriendRequestItem({
  profile,
  to,
  onAccept,
  onReject,
}: {
  profile: Profile;
  to?: number;
  onAccept: (from: number, to: number) => void;
  onReject: (from: number, to: number) => void;
}) {
  if (!profile) {
    return null;
  }
  if (!to) {
    return null;
  }
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <Image unoptimized 
          src={profile?.profile_image || ""}
          alt={profile.nickname}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-2">
          <Link href={`/u/${profile.slug}`} className=" font-bold">
            {profile.nickname}
          </Link>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full text-sm"
          onClick={() => onAccept(profile.id!, to)}
        >
          수락
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-full text-sm"
          onClick={() => onReject(profile.id!, to)}
        >
          거절
        </button>
      </div>
    </div>
  );
}
