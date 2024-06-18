"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function Home() {
  async function signInWithTwitter() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });
    console.log(data, error);
  }

  async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    console.log(error);
  }

  return (
    <main className="h-full grid place-items-center">
      <div>
        <h1>Weaving</h1>
        <p>너와 나의 연결 고리, 위빙</p>
      </div>
      <button onClick={signInWithTwitter}>트위터로 시작하기</button>
      <button onClick={signOut}>로그아웃</button>
    </main>
  );
}
