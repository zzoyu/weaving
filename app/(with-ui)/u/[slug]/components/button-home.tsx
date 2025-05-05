"use client";

import { useRouter } from "next/navigation";

export function ButtonHome() {
  const router = useRouter();
  function handleClick() {
    router.push("/");
  }
  return (
    <button className="p-1" onClick={handleClick}>
      메인
      {/* <HomeIcon width={24} height={24} /> */}
    </button>
  );
}
