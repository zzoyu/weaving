"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";

export default function Step3({
  nickname,
  onNext,
}: {
  nickname: string;
  onNext: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      className="w-full h-full p-8 flex flex-col justify-between relative"
      action={(formData) => {
        onNext();
      }}
      name="nickname-form"
      id="nickname-form"
      ref={formRef}
    >
      <div className="flex flex-col gap-2 w-full relative">
        <p className="text-lg font-medium">
          회원가입을
          <br />
          축하합니다!
        </p>
      </div>
      <div className="flex flex-col gap-2 relative w-full relative">
        <div className="flex flex-col gap-4 items-center relative w-full">
          <div className="relative w-3/4 h-auto aspect-square -mt-10">
            <Image
              src="/assets/images/onboarding/welcome.png"
              className="w-full h-full"
              fill
              objectFit="contain"
              unoptimized
              alt="축하 이미지"
            />
          </div>
          <p className="text-lg font-medium">
            <span className="text-primary">{nickname}</span>님의 우주가
            탄생했습니다.
          </p>
          <p className="text-sm text-center">
            지금부터 광활한 빈 공간을 채우고,
            <br />
            다른 세계들과 연결되어 보세요.
          </p>
        </div>
      </div>
      <Button
        type="button"
        size="lg"
        className="bg-primary text-black hover:bg-primary/90"
        onClick={() => formRef.current?.requestSubmit()}
      >
        시작하기
      </Button>
    </form>
  );
}
