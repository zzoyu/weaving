"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef, useState } from "react";

export default function Step2({
  onNext,
}: {
  onNext: (choices: string[]) => void;
}) {
  return <Survey onNext={onNext} />;
}

interface SurveyQuestion {
  question: string;
  choices: string[];
  etc?: boolean;
}

function Survey({ onNext }: { onNext: (choices: string[]) => void }) {
  const surveyQuestions: SurveyQuestion[] = [
    {
      question: "1. 위빙을 통해 주로 하고 싶은 일은 무엇인가요?",
      choices: [
        "내 캐릭터와 세계관을 정리하고 백업하기",
        "정리된 프로필/세계관 링크를 다른 사람에게 쉽게 공유",
        "현재 소속된 팀이나 커뮤니티의 정보를 체계적으로 관리",
        "작품 아이디어나 설정을 기록해두고 발전시키기",
      ],
    },
    {
      question: "2. 캐릭터 프로필이나 세계관 정보를 주로 어디에 정리하셨나요?",
      choices: [
        "SNS: 트위터(현 X), 블루스카이, 마스토돈 등",
        "개인 블로그나 홈페이지 (티스토리, 네이버 블로그 등)",
        "메모/노트 도구 (Notion, 에버노트, 구글 문서 등)",
        "따로 정리하지 않았음",
      ],
    },
    {
      question: "3. 위 도구들을 사용하면서 가장 불편했던 점은 무엇이었나요?",
      choices: [
        "캐릭터 관계도나 세계관 표시 같은 전용 기능이 없음",
        "타인에게 공유하기 어려움",
        "타인에게 일부만 보여주거나 비공개 설정하기가 불편함",
        "용량이나 작성할 수 있는 개수 제한이 있음",
        "검색이나 관리가 어려움",
      ],
    },
  ];

  const [choices, setChoices] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form
      className="w-full h-full p-8 flex flex-col justify-between"
      action={(formData) => {
        onNext(choices);
      }}
      name="survey-form"
      id="survey-form"
      ref={formRef}
    >
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium">위빙을 찾은 이유를 알려 주세요</p>
        <p className="text-sm text-neutral-400 mt-2">
          • 복수 선택이 가능합니다
        </p>
        <div className="w-full flex flex-col gap-8">
          {surveyQuestions.map((item, index) => (
            <div key={index} className="mt-6">
              <p className="font-medium mb-6">{item.question}</p>
              <div className="mt-2 flex flex-col gap-4">
                {item.choices.map((choice, choiceIndex) => (
                  <label
                    key={choiceIndex}
                    className="flex items-start space-x-2"
                  >
                    <span className="flex items-center justify-center h-6">
                      <Checkbox
                        checked={choices.includes(choice)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setChoices((prev) => [...prev, choice]);
                          } else {
                            setChoices((prev) =>
                              prev.filter((c) => c !== choice)
                            );
                          }
                        }}
                        value={choice}
                        name={`question-${index}`}
                      />
                    </span>
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex h-fit pt-8 items-stretch">
        <Button
          className="w-full"
          type="button"
          size="lg"
          onClick={() => formRef.current?.requestSubmit()}
        >
          다음
        </Button>
      </div>
    </form>
  );
}
