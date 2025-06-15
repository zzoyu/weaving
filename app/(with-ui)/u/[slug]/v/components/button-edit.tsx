"use client";

import { changeProfileImage } from "@/actions/change-profile";
import EditIcon from "@/public/assets/icons/edit.svg";
import { useRef } from "react";

export function ButtonEdit() {
  const profileFileInput = useRef<HTMLInputElement>(null);

  function handlePickProfileImage() {
    profileFileInput.current?.click();
  }
  function handleChangeProfileImage(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.set("profile_image", file);
    // changeProfileImage(slug, formData);
  }

  return (
    <button
      className="absolute -top-1 -right-1 p-1 bg-white rounded-full"
      onClick={handlePickProfileImage}
    >
      <EditIcon width={16} height={16} color="black" />

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={profileFileInput}
        onChange={handleChangeProfileImage}
      />
    </button>
  );
}
