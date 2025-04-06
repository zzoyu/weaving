"use client";

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
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="relative">
        <img
          src={avatarUrl}
          alt="프로필 사진"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        {isEditing && (
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        )}
      </div>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="self-end px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        {isEditing ? "완료" : "수정"}
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">이름</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">{name}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">소개</label>
          {isEditing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">{bio}</p>
          )}
        </div>
        {isEditing && (
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "저장 중..." : "저장"}
          </button>
        )}
      </form>
    </div>
  );
}
