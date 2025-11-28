import {
  GenerateApocalypseResult,
  GenerateCommonResult,
  GenerateFantasyEasternResult,
  GenerateFantasyWesternResult,
  GenerateRealisticResult,
  GenerateSciFiResult,
} from "@/utils/random-character";
import { useMemo } from "react";

export const additionalGenerators = {
  "option-reality": GenerateRealisticResult,
  "option-fantasy-west": GenerateFantasyWesternResult,
  "option-fantasy-east": GenerateFantasyEasternResult,
  "option-horror": GenerateApocalypseResult,
  "option-sf": GenerateSciFiResult,
};

export default function useRandomCharacter(
  type: keyof typeof additionalGenerators = "option-reality"
) {
  const resultCommon = useMemo(() => GenerateCommonResult(), []);
  const resultAdditional = useMemo(() => additionalGenerators[type](), [type]);

  return {
    resultCommon,
    resultAdditional,
    count: 5, // 예시로 5를 반환
  };
}
