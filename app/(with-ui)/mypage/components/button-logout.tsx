"use client";

import { createClient } from "@/utils/supabase/client";

export default function ButtonLogout() {
  function handleLogout() {
    const client = createClient();
    client.auth.signOut().then(() => {
      window.location.href = "/";
    });
  }
  
  return <button className="w-full px-4 py-2" onClick={handleLogout}>
  로그아웃
</button>
}
