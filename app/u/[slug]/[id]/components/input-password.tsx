"use client";

import IconLocked from "@/public/assets/icons/locked.svg";

export default function InputPassword() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <IconLocked className="w-20 h-20" />
      <p className="text-xl">비밀번호를 입력해주세요.</p>
      <input type="password" name="password" />
      <button type="submit" className="bg-primary-200 text-white p-2 rounded">
        확인
      </button>
    </div>
  );
}
