import fantasy_western from "@/data/random-character/fantasy-western.json";

const status = fantasy_western.traits.status;
const talent_w = fantasy_western.traits.talent_w;
const lineage = fantasy_western.traits.lineage;
const secret = fantasy_western.traits.secret;

function getRandomParameters() {
  return {
    status: status[Math.floor(Math.random() * status.length)],
    talent_w: talent_w[Math.floor(Math.random() * talent_w.length)],
    lineage: lineage[Math.floor(Math.random() * lineage.length)],
    secret: secret[Math.floor(Math.random() * secret.length)],
  };
}

export function GenerateFantasyWesternResult() {
  const { status, talent_w, lineage, secret } = getRandomParameters();

  return {
    resultText: `${status}인 그는 ${talent_w}에 특히 재능을 보입니다. 그의 조상은 ${lineage}이라는 소문이 전해집니다. 아무도 모르는 그의 ${secret} 그를 운명의 소용돌이 한 가운데로 끌고 갑니다.
`,
    resultParameters: {
      status,
      talent_w,
      lineage,
      secret,
    },
  };
}
