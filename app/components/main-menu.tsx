"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import ProfileImage from "./profile-image";
import { signInWithTwitter, signOut } from "@/lib/client-authentication";

export default function MainMenu() {
  const supabase = createClient();

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  async function handleSignIn() {
    const { data, error } = await signInWithTwitter();
    if (error) {
      console.error(error);
    }
    if (data) {
      console.log(data);
    }
  }

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        if (session) {
          setIsSignedIn(true);
          setUser(session.user);
          console.log(session.user);
        } else {
          setIsSignedIn(false);
        }
      }
    });
    return () => {
      data?.subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <div className="h-1/2 flex flex-col justify-start items-center gap-10 pt-10">
      {isSignedIn === false && (
        <button onClick={handleSignIn} className="text-primary-300">
          트위터로 시작하기
        </button>
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
      <ul className="flex items-center divide-x-2 gap-1 text-gray-400 divide-gray-300 underline underline-offset-2 font-thin text-sm">
        <li>
          <Link href="/term">이용약관</Link>
        </li>
        <li className="pl-1">
          <Link href="/privacy">개인정보보호정책</Link>
        </li>
      </ul>
      <div className="h-full flex flex-col justify-end pb-10">
        <footer className="font-light text-gray-400">©weaving</footer>
      </div>
    </div>
  );
}
