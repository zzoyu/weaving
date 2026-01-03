"use client";

import { ArrowLeftIcon } from "lucide-react";
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
      <ArrowLeftIcon fill="none" stroke="currentColor" />
    </button>
  );
}
