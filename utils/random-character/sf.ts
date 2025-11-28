import sf from "@/data/random-character/sf.json";

const world = sf.traits.world;
const ratio = sf.traits.ratio;
const affiliation_sf = sf.traits.affiliation_sf;
const role = sf.traits.role;
const goal = sf.traits.goal;

function getRandomParameters() {
  return {
    world: world[Math.floor(Math.random() * world.length)],
    ratio: ratio[Math.floor(Math.random() * ratio.length)],
    affiliation_sf:
      affiliation_sf[Math.floor(Math.random() * affiliation_sf.length)],
    role: role[Math.floor(Math.random() * role.length)],
    goal: goal[Math.floor(Math.random() * goal.length)],
  };
}

export function GenerateSciFiResult() {
  const { world, ratio, affiliation_sf, role, goal } = getRandomParameters();
  return {
    resultText: `${world}에서, 신체의 ${ratio}를 기계로 대체한 그는 ${affiliation_sf} 소속의 ${role}로 살아가고 있습니다. 여러 가지 큰 사건을 겪은 그는 오직 ${goal} 만을 인생의 목표로 삼게 됩니다.`,
    resultParameters: {
      world,
      ratio,
      affiliation_sf,
      goal,
    },
  };
}
