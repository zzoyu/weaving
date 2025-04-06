"use client";

import { useState } from "react";

export default function ProfileEditForm({ profile }: { profile: Profile }) {
  console.log(profile);
  const [name, setName] = useState(profile.nickname);
  const [bio, setBio] = useState(profile.slug);
  const [avatarUrl, setAvatarUrl] = useState(profile.profile_image);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        소개
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <label>
        아바타
        <input
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </label>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
