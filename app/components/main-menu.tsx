"use client";

import {
  signInWithGoogle,
  signInWithTwitter,
  signOut,
} from "@/lib/client-authentication";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileImage from "./profile-image";

export default function MainMenu() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  async function handleTwitterSignIn() {
    const { data, error } = await signInWithTwitter();
    if (error) {
      console.error(error);
      throw error;
    }
  }
  async function handleGoogleSignIn() {
    const { data, error } = await signInWithGoogle();
    if (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    // 초기 세션 상태 확인
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setIsSignedIn(true);
        setUser(user);
      }
    });

    // 세션 상태 변경 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        if (session) {
          setIsSignedIn(true);
          setUser(session.user);
          // 리다이렉트 경로가 있으면 해당 경로로, 없으면 프로필 페이지로
          router.replace(redirectPath || "/");
        } else {
          setIsSignedIn(false);
          setUser(undefined);
        }
      }
      if (event === "SIGNED_OUT") {
        setIsSignedIn(false);
        setUser(undefined);
        router.refresh();
      }
      if (event === "TOKEN_REFRESHED") {
        // 토큰이 갱신되면 현재 페이지 새로고침
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [redirectPath]);

  return (
    <div className="flex flex-col flex-1 justify-start items-center gap-8 pt-10 w-full">
      {isSignedIn === false && (
        <>
          <div className="flex flex-col gap-2.5 w-fit px-6 mb-10 lg:mb-20">
            <button
              onClick={handleTwitterSignIn}
              className="bg-black text-white py-2.5 px-10 flex-1 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2 text-base justify-center"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              로 시작하기
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="bg-black text-white py-2.5 flex-1  px-10 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2 text-base justify-center"
            >
              Google로 시작하기
            </button>
          </div>
          <small className="text-gray-500 text-center">
            로그인 시 이용약관 및 개인정보처리방침에 동의한 것으로 처리됩니다.
          </small>
        </>
      )}

      {isSignedIn && (
        <>
          <Link href="/">
            <ProfileImage src={user?.user_metadata?.avatar_url} />
          </Link>

          <button onClick={signOut} className="">
            로그아웃
          </button>
        </>
      )}
      <ul className="flex items-center divide-x-2 gap-1 text-gray-400 divide-gray-300 underline underline-offset-2 font-thin text-xs">
        <li>
          <Link href="/terms">서비스 이용약관</Link>
        </li>
        <li className="pl-1">
          <Link href="/privacy">개인정보보호정책</Link>
        </li>
        <li className="pl-1">
          <Link href="/guideline">콘텐츠가이드라인</Link>
        </li>
      </ul>
    </div>
  );
}
