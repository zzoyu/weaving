import realistic from "@/data/random-character/realistic.json";

const city = realistic.traits.city;
const job = realistic.traits.job;
const trait = realistic.traits.trait;

function getRandomAdditionalParameters() {
  return {
    city: city[Math.floor(Math.random() * city.length)],
    job: job[Math.floor(Math.random() * job.length)],
    trait: trait[Math.floor(Math.random() * trait.length)],
  };
}

export function GenerateRealisticResult() {
  const parameters = getRandomAdditionalParameters();

  return {
    resultText: `그는 ${parameters.city}에서 인생의 대부분을 보낸 ${parameters.job}입니다. 주변인들은 그가 ${parameters.trait} 편이라고 말합니다. 겉보기에는 평범하지만, 내면엔 아직 드러나지 않은 이야기가 숨어 있습니다.`,
    resultParameters: {
      city: parameters.city,
      job: parameters.job,
      trait: parameters.trait,
    },
  };
}
