"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileImage from "./profile-image";
import { signInWithTwitter, signOut } from "@/lib/client-authentication";

export default function MainMenu() {
  const supabase = createClient();

  const [isSignedIn, setIsSignedIn] = useState<boolean>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setIsSignedIn(true);
        setUser(session.user);
        console.log(session.user);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);

  return (
    <div className="h-1/2 flex flex-col justify-center items-center gap-10">
      {isSignedIn === false && (
        <button onClick={signInWithTwitter}>트위터로 시작하기</button>
      )}
      {isSignedIn && (
        <>
          <Link href="/profile">
            <ProfileImage src={user?.user_metadata?.avatar_url} />
          </Link>

          <button onClick={signOut} className="">
            로그아웃
          </button>
        </>
      )}
    </div>
  );
}
