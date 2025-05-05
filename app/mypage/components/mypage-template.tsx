"use client";

import { createClient } from "@/utils/supabase/client";
import ProfileEditForm from "./profile-edit-form";

export default function MypageTemplate({ profile }: { profile: Profile }) {
  function handleLogout() {
    const client = createClient();
    client.auth.signOut().then(() => {
      window.location.href = "/";
    });
  }

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <section className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">내 프로필</h2>
          <ProfileEditForm profile={profile} />
        </div>
        <div className="mb-4">
          <button
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
        <div>
          <button className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
            회원탈퇴
          </button>
        </div>
      </section>
    </main>
  );
}
