import {
  GenerateCommonResult,
  GenerateFantasyEastResult,
  GenerateFantasyWestResult,
  GenerateHorrorResult,
  GenerateRealityResult,
  GenerateSciFiResult,
} from "@/utils/random-character";
import { useMemo } from "react";

export const additionalGenerators = {
  "option-reality": GenerateRealityResult,
  "option-fantasy-west": GenerateFantasyWestResult,
  "option-fantasy-east": GenerateFantasyEastResult,
  "option-horror": GenerateHorrorResult,
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
