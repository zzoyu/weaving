import fantasy_eastern from "@/data/random-character/fantasy-eastern.json";

const identity = fantasy_eastern.traits.identity;
const symbol = fantasy_eastern.traits.symbol;
const talent_e = fantasy_eastern.traits.talent_e;
const type = fantasy_eastern.traits.type;
const past = fantasy_eastern.traits.past;

function getRandomParameters() {
  return {
    identity: identity[Math.floor(Math.random() * identity.length)],
    symbol: symbol[Math.floor(Math.random() * symbol.length)],
    talent_e: talent_e[Math.floor(Math.random() * talent_e.length)],
    type: type[Math.floor(Math.random() * type.length)],
    past: past[Math.floor(Math.random() * past.length)],
  };
}

export function GenerateFantasyEasternResult() {
  const { identity, symbol, talent_e, type, past } = getRandomParameters();

  return {
    resultText: `그는 ${identity}, 그와 그의 집안을 상징하는 것은 ${symbol}입니다. ${talent_e}에 이름이 높습니다. 내공이 뛰어난 이들은 그가 ${type} 기운을 타고 났다는 것을 느낄 수 있습니다. 과거에 ${past} 사실이 있지만 이를 기억하거나 알고 있는 사람은 드뭅니다. `,
    resultParameters: {
      identity,
      symbol,
      talent_e,
      type,
      past,
    },
  };
}
