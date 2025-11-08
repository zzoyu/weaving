"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { additionalGenerators } from "@/hooks/use-random-character";
import Image from "next/image";
import { useState } from "react";

export default function Page1({
  goToNextPage,
}: {
  goToNextPage: (selected: keyof typeof additionalGenerators) => void;
}) {
  const [selectedUniverse, setSelectedUniverse] =
    useState<keyof typeof additionalGenerators>("option-reality");
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div>
        <Image
          unoptimized
          unselectable="on"
          src="/assets/images/more/random-character/header.png"
          alt="Random Character Illustration"
          width={400}
          height={400}
        />
      </div>
      <h1 className="text-3xl mb-8">랜덤 캐릭터 생성기</h1>
      <p className="text-lg text-center max-w-2xl">세계관을 선택해 주세요</p>
      <div className="mt-8 p-10 rounded-xl w-full border-background-muted border-2">
        {/* 세계관 선택 UI 추가 예정 */}
        <RadioGroup
          defaultValue="option-reality"
          className="grid grid-cols-1 gap-6"
          onValueChange={(value) =>
            setSelectedUniverse(value as keyof typeof additionalGenerators)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-reality" id="option-reality" />
            <Label htmlFor="option-reality">현실</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-fantasy-west"
              id="option-fantasy-west"
            />
            <Label htmlFor="option-fantasy-west">판타지 (서양, 마법)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-fantasy-east"
              id="option-fantasy-east"
            />
            <Label htmlFor="option-fantasy-east">판타지 (동양, 무협)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-horror" id="option-horror" />
            <Label htmlFor="option-horror">호러 / 아포칼립스</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-sf" id="option-sf" />
            <Label htmlFor="option-sf">SF</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="w-full">
        <Button
          className="mt-8 w-full bg-primary text-text-black hover:bg-primary/90"
          size="lg"
          onClick={() => goToNextPage(selectedUniverse)}
        >
          생성하기
        </Button>
      </div>
    </div>
  );
}
