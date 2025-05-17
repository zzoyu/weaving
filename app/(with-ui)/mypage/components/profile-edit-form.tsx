"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfileEditForm({ profile }: { profile: Profile }) {
  const [name, setName] = useState(profile.nickname);
  const [bio, setBio] = useState(profile.slug);
  const [avatarUrl, setAvatarUrl] = useState(profile.profile_image);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitting(false);
    setIsEditing(false);
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <div className="relative flex flex-col gap-4 justify-center items-center">
          <Image
            src={avatarUrl || ""}
            alt="프로필 사진"
            width={96}
            height={96}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                계정명
              </label>
              <p className="py-2">{name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                접근 코드
              </label>
              <p className="py-2">{bio}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
