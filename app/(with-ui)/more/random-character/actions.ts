"use server";

import { additionalGenerators } from "@/hooks/use-random-character";
import { GenerateCommonResult } from "@/utils/random-character";
import { createClient } from "@/utils/supabase/server";

export async function fetchLeftRandomCharacterCountByProfileId(
  profileId: number
) {
  const client = await createClient();
  const result = await client
    .from("more_log")
    .select("*")
    .eq("profile_id", profileId)
    .eq("type", "random-character")
    .gte("created_at", new Date(new Date().setHours(0, 0, 0, 0)).toISOString());

  if (result.error) {
    throw result.error;
  }

  const usedCount = result.data.length;
  const MAX_COUNT = 5;

  return Math.max(0, MAX_COUNT - usedCount);
}

export async function generateRandomCharacter(
  profile_id: number,
  type: keyof typeof additionalGenerators = "option-reality"
) {
  const leftCount = await fetchLeftRandomCharacterCountByProfileId(profile_id);

  if (leftCount <= 0) {
    return {
      error: "오늘은 더 이상 생성할 수 없습니다. 내일 다시 시도해주세요.",
    };
  }

  const resultCommon = GenerateCommonResult();

  if (
    !Object.prototype.hasOwnProperty.call(additionalGenerators, type) ||
    typeof additionalGenerators[type] !== "function"
  ) {
    return {
      error: "지원하지 않는 타입입니다.",
    };
  }

  const resultAdditional = additionalGenerators[type]();

  const client = await createClient();
  const logResult = await client
    .from("more_log")
    .insert({
      profile_id,
      type: "random-character",
      result: {
        resultCommon,
        resultAdditional,
      },
    })
    .select("uuid")
    .limit(1);

  const uuid = logResult?.data?.[0]?.uuid;

  if (logResult.error) {
    throw logResult.error;
  }

  return {
    resultCommon,
    resultAdditional,
    leftCount,
    uuid,
  };
}

export async function fetchRandomCharacterResultByUUID(uuid: string): Promise<{
  resultCommon: ReturnType<typeof GenerateCommonResult>;
  resultAdditional: ReturnType<
    (typeof additionalGenerators)[keyof typeof additionalGenerators]
  >;
}> {
  const client = await createClient();
  const result = await client
    .from("more_log")
    .select("result")
    .eq("uuid", uuid)
    .limit(1)
    .single();
  if (result.error) {
    throw result.error;
  }

  return {
    resultCommon: result.data.result.resultCommon,
    resultAdditional: result.data.result.resultAdditional,
  };
}
