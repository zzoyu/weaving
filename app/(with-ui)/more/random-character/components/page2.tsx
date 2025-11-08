"use client";

import { DialogShareButton } from "@/components/interactions/dialog-share-button";
import { Button } from "@/components/ui/button";
import useRandomCharacter from "@/hooks/use-random-character";
import { useToast } from "@/hooks/use-toast";
import { Copy, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Color from "./color";
import ResultText from "./result-text";

export default function Page2({
  resultCommon,
  resultAdditional,
  count,
  uuid,
}: {
  resultCommon: ReturnType<typeof useRandomCharacter>["resultCommon"];
  resultAdditional: ReturnType<typeof useRandomCharacter>["resultAdditional"];
  count: number;
  uuid: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl font-bold mb-8 text-center">캐릭터 생성 결과</h1>

      <div className="w-full bg-white rounded-lg p-6 mb-8 space-y-4 shadow-lg">
        {/* common result */}
        <ResultText>
          {resultCommon.resultText}
          <Color color={resultCommon.resultParameters.color} /> 입니다.
        </ResultText>

        {/* additional result */}
        <ResultText>{resultAdditional.resultText}</ResultText>
      </div>

      <div className="w-full space-y-8">
        <div className="flex flex-row gap-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full text-background-dark hover:text-background-dark"
            onClick={(event) => {
              event.preventDefault();
              navigator.clipboard.writeText(
                resultCommon.resultText + "\n" + resultAdditional.resultText
              );
              toast({
                description: "캐릭터 설명이 클립보드에 복사되었습니다.",
              });
            }}
          >
            <Copy className="text-background-dark" />
            복사하기
          </Button>

          <DialogShareButton
            title="캐릭터 생성 결과 공유하기"
            extraVariables={{
              CONTENT:
                resultCommon.resultFullText +
                "\n" +
                resultAdditional.resultText,
            }}
            targetPath={
              process.env.NEXT_PUBLIC_BASE_URL +
              "/more/random-character/" +
              uuid
            }
            templateId={Number(
              process.env.NEXT_PUBLIC_KAKAO_MESSAGE_TEMPLATE_ID_RANDOM_CHARACTER
            )}
          >
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full text-background-dark hover:text-background-dark"
            >
              <Share2 className="text-background-dark" />
              공유하기
            </Button>
          </DialogShareButton>
        </div>

        <Button
          className="w-full bg-primary text-text-black hover:bg-primary/90"
          size="lg"
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          다시 생성하기 ({count}/5)
        </Button>
      </div>
    </div>
  );
}
