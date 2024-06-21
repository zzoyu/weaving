"use client";

import Image from "next/image";

import EditIcon from "@/public/assets/icons/edit.svg";
import { useRef } from "react";
import { changeProfileImage } from "@/actions/change-profile";
interface ProfileImageProps {
  src: string;
  isEditable?: boolean;
  slug: string;
}

export default function ProfileImage({
  src,
  isEditable,
  slug,
}: ProfileImageProps) {
  const profileFileInput = useRef<HTMLInputElement>(null);

  function handlePickProfileImage() {
    profileFileInput.current?.click();
  }
  function handleChangeProfileImage(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file || !slug) return;
    const formData = new FormData();
    formData.set("profile_image", file);
    changeProfileImage(slug, formData);
  }

  return (
    <div className="relative">
      <div className="w-20 h-20 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
        <Image src={src} alt={"프로필 이미지"} width={200} height={200} />
      </div>
      {isEditable && (
        <button
          className="absolute -top-1 -right-1 p-1 bg-white rounded-full"
          onClick={handlePickProfileImage}
        >
          <EditIcon width={16} height={16} color="black" />

          <input
            type="file"
            className="hidden"
            ref={profileFileInput}
            onChange={handleChangeProfileImage}
          />
        </button>
      )}
    </div>
  );
}
