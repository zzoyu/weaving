"use client";

import IconLocked from "@/public/assets/icons/locked.svg";

export default function InputPassword() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-6 p-4 bg-gray-50 rounded-lg shadow-md">
      <IconLocked className="w-16 h-16 text-gray-500" />
      <p className="text-lg font-semibold text-gray-700">
        비밀번호를 입력해주세요
      </p>
      <input
        type="password"
        name="password"
        className="w-full max-w-sm p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
        placeholder="비밀번호"
      />
      <button
        type="submit"
        className="w-full max-w-sm p-2 text-white bg-primary-100 rounded hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-200"
        style={{ marginTop: "1rem" }}
      >
        확인
      </button>
    </div>
  );
}
