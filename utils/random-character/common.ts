import common from "@/data/random-character/common.json";

const body_type = common.traits.body_type;
const gender = common.traits.gender;
const personality = common.traits.personality;
const appearance_trait = common.traits.appearance_trait;

interface RandomCharacterCommonResult {
  body_type: string;
  gender: string;
  personality: string;
  appearance_trait: string;
  color: string;
}

function getRandomElement(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomCommonParameters(): RandomCharacterCommonResult {
  return {
    body_type: getRandomElement(body_type),
    gender: getRandomElement(gender),
    personality: getRandomElement(personality),
    appearance_trait: getRandomElement(appearance_trait),
    color: getRandomColor(),
  };
}

export function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function GenerateCommonResult() {
  const { body_type, gender, personality, appearance_trait, color } =
    getRandomCommonParameters();
  return {
    resultText: `캐릭터는 ${body_type} 체형의 ${gender}입니다. ${personality} 성격이며 ${appearance_trait} 특징입니다. 그를 떠올리게 하는 색은 `,
    resultFullText: `캐릭터는 ${body_type} 체형의 ${gender}입니다. ${personality} 성격이며 ${appearance_trait} 특징입니다. 그를 떠올리게 하는 색은 ${color}입니다.`,
    resultParameters: {
      body_type,
      gender,
      personality,
      appearance_trait,
      color,
    },
  };
}

export function generateId() {
  // Use cryptographically secure random number generator
  const arr = new Uint8Array(9);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(arr);
  } else if (typeof crypto !== 'undefined') {
    // Node.js or Web Worker environment
    crypto.getRandomValues(arr);
  } else {
    // Fallback for environments without crypto API (should not happen in modern browsers/Node.js)
    throw new Error('No cryptographic random number generator available');
  }
  // Convert each byte to base-36 and join
  return Array.from(arr, b => b.toString(36)).join('');
}
