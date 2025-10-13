"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

export default function Step1({
  profile,
  onNext,
}: {
  profile: Profile;
  onNext: (nickname: string) => void;
}) {
  return <NicknameTemplate profile={profile} onNext={onNext} />;
}

function NicknameTemplate({
  profile,
  onNext,
}: {
  profile: Profile;
  onNext: (nickname: string) => void;
}) {
  const [newNickname, setNewNickname] = useState<string>(profile.nickname);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form
      className="w-full h-full p-8 flex flex-col justify-between"
      action={(formData) => {
        const nickname = formData.get("nickname") as string;
        onNext(nickname);
      }}
      name="nickname-form"
      id="nickname-form"
      ref={formRef}
    >
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium">
          위빙에서 사용하실
          <br />
          닉네임을 입력해 주세요
        </p>
        <Input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력하세요"
          className="mt-2"
          maxLength={25}
          minLength={1}
          required
          pattern="^[가-힣a-zA-Z0-9]+$"
          onChange={(e) => setNewNickname(e.target.value)}
          value={newNickname}
        />

        <div className="w-full flex flex-col">
          <p className="text-sm text-neutral-400 mt-2">
            • 닉네임은 국문, 영문, 숫자만 입력 가능합니다 (특수문자 사용 불가)
          </p>
          <p className="text-sm text-neutral-400">
            • 닉네임은 25자 이내로 작성 가능합니다
          </p>
        </div>
      </div>
      <Button
        type="button"
        size="lg"
        onClick={() => formRef.current?.requestSubmit()}
      >
        다음
      </Button>
    </form>
  );
}
