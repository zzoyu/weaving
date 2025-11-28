import apocalypse from "@/data/random-character/apocalypse.json";

const catastrophe_type = apocalypse.traits.catastrophe_type;
const environment = apocalypse.traits.environment;
const affiliation = apocalypse.traits.affiliation;
const situation = apocalypse.traits.situation;
const item = apocalypse.traits.item;

function getRandomParameters() {
  return {
    catastrophe_type:
      catastrophe_type[Math.floor(Math.random() * catastrophe_type.length)],
    environment: environment[Math.floor(Math.random() * environment.length)],
    affiliation: affiliation[Math.floor(Math.random() * affiliation.length)],
    situation: situation[Math.floor(Math.random() * situation.length)],
    item: item[Math.floor(Math.random() * item.length)],
  };
}

export function GenerateApocalypseResult() {
  const { catastrophe_type, environment, affiliation, situation, item } =
    getRandomParameters();
  return {
    resultText: `그는 ${catastrophe_type}에서 살아남아야 합니다. 현재 ${environment}에 위치해 있으며, 함께 있는 집단은 ${affiliation}입니다. 그는 ${situation} 경험하며 많은 변화를 겪었습니다. 그의 손에 지닌 것은 ${item} 뿐입니다만, 도움이 될 지는 지켜봐야겠습니다.
`,
    resultParameters: {
      catastrophe_type,
      environment,
      affiliation,
      situation,
      item,
    },
  };
}
