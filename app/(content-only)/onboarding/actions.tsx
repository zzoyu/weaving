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

  const colorKo = color.ko[colorIndex].replace(" ", "");
  const colorEn = color.en[colorIndex].replace(" ", "");

  const adjectiveKo = adjective.ko[adjectiveIndex].replace(" ", "");
  const adjectiveEn = adjective.en[adjectiveIndex].replace(" ", "");

  // const suffix = faker.string.alphanumeric({
  //   length: 5,
  //   casing: "upper",
  // });
  const candidates = Array.from({ length: 5 }, () =>
    faker.string.alphanumeric({
      length: 5,
      casing: "upper",
    })
  );

  const nickname = `${adjectiveKo} ${colorKo} `; // + suffix
  const slug = `${adjectiveEn}-${colorEn}-`; // + suffix
  const slugCandidates = candidates.map((candidate) => `${slug}${candidate}`);

  const supabase = createClient();
  const { data: existingSlugs } = await supabase
    .from("profiles")
    .select("slug")
    .in("slug", slugCandidates);

  if (existingSlugs && existingSlugs.length > 0) {
    // 이미 존재하는 slug가 있다면, 후보군에서 제거
    const existingSlugSet = new Set(existingSlugs.map((item) => item.slug));
    const availableCandidatesIndexes = candidates
      .map((candidate, index) =>
        existingSlugSet.has(`${slug}${candidate}`) ? -1 : index
      )
      .filter((index) => index !== -1);

    if (availableCandidatesIndexes.length > 0) {
      // 사용 가능한 후보군이 있다면, 그 중 하나를 선택
      return {
        nickname: nickname + candidates[availableCandidatesIndexes[0]],
        slug: slug + candidates[availableCandidatesIndexes[0]],
      };
    }
  }

  // Check for slug uniqueness and adjust if necessary

  return {
    nickname: nickname + candidates[0],
    slug: slugCandidates[0],
  };
}
