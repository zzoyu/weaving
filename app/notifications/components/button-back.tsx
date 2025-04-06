"use client";

import IconGoBack from "@/public/assets/icons/go-back.svg";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return (
    <button
      className="flex items-center justify-center w-10 h-10 text-primary-300"
      onClick={handleClick}
    >
      <IconGoBack width={40} height={40} />
    </button>
  );
}
