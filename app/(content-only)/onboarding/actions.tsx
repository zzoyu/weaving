"use server";

import { createClient } from "@/utils/supabase/server";
import { adjective } from "@/utils/word-dictionary/adjective";
import { color } from "@/utils/word-dictionary/color";
import { en, Faker, generateMersenne53Randomizer } from "@faker-js/faker";

const randomizer = generateMersenne53Randomizer();
const faker = new Faker({
  locale: en,
  randomizer,
});

export async function createSurveyResponse(choices: string[]) {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("survey_responses")
    .insert([{ user_id: userData.user?.id, response: choices }]);

  return { error };
}

export async function fetchRandomNicknameAndSlug(metadata: TwitterMetadata) {
  // provider_id로부터 안정적인 해시를 생성합니다

  // 해시를 기반으로 시드를 설정합니다
  // const seedInt = parseInt(metadata.provider_id);
  // randomizer.seed(seedInt);

  const colorIndex = faker.number.int(color.ko.length - 1);
  const adjectiveIndex = faker.number.int(adjective.ko.length - 1);

  const colorKo = color.ko[colorIndex];
  const colorEn = color.en[colorIndex];

  const adjectiveKo = adjective.ko[adjectiveIndex];
  const adjectiveEn = adjective.en[adjectiveIndex];

  const suffix = faker.string.alphanumeric({
    length: 5,
    casing: "upper",
  });
  const candidates = Array.from({ length: 5 }, () =>
    faker.string.alphanumeric({
      length: 5,
      casing: "upper",
    })
  );

  const nickname = `${colorKo} ${adjectiveKo} ${suffix}`;
  const slug = `${colorEn}-${adjectiveEn}-${suffix}`;

  return {
    nickname,
    slug,
    candidates,
  };
}
