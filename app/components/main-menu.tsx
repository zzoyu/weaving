"use client";

import { signInWithTwitter, signOut } from "@/lib/client-authentication";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileImage from "./profile-image";

export default function MainMenu() {
  const supabase = createClient();
  const router = useRouter();

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  async function handleSignIn() {
    const { data, error } = await signInWithTwitter();
    if (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        if (session) {
          setIsSignedIn(true);
          setUser(session.user);
          router.replace("/profile");
        } else {
          setIsSignedIn(false);
        }
      }
      if (event === "SIGNED_OUT") {
        setIsSignedIn(false);
        setUser(undefined);
        router.refresh();
      }
    });
    return () => {
      data?.subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <div className="h-1/2 flex flex-col justify-start items-center gap-10 pt-10">
      {isSignedIn === false && (
        <button
          onClick={handleSignIn}
          className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2 text-xl"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          로 시작하기
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
