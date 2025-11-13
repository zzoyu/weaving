const body_type = [
  "균형잡힌",
  "평균적인",
  "건강한",
  "탄탄한",
  "유연한",
  "왜소한",
  "단단한",
  "슬림한",
  "민첩해보이는",
  "근육질의",
  "날렵한",
  "마른",
  "우람한",
  "아담한",
  "건장한",
  "늘씬한",
  "다부진",
  "통통한",
  "우아한",
  "선이 부드러운",
  "둔중한",
  "가냘픈",
  "여리여리한",
  "호리호리한",
  "듬직한",
  "장신",
  "잔근육이 있는",
  "근육으로 다져진",
  "떡 벌어진",
  "야무진",
  "다듬어진",
  "글래머러스한",
  "육감적인",
  "복스러운",
  "모델 같은",
  "쭉 뻗은",
  "건강미 넘치는",
  "가벼워 보이는",
  "야무져 보이는",
  "부실한",
  "삐쩍 마른",
  "부해 보이는",
];

const gender = ["남성", "여성"];

const personality = [
  "활발한",
  "사교적인",
  "낙천적인",
  "외향적인",
  "호기심 많은",
  "유머러스한",
  "자신감 있는",
  "에너지 넘치는",
  "리더십 있는",
  "도전적인",
  "모험심 강한",
  "조용한",
  "신중한",
  "내성적인",
  "차분한",
  "분석적인",
  "논리적인",
  "이성적인",
  "철저한",
  "계획적인",
  "완벽주의적인",
  "논리적인",
  "따뜻한",
  "다정한",
  "배려심 깊은",
  "예민한",
  "감수성이 풍부한",
  "정이 많은",
  "상냥한",
  "순한",
  "온화한",
  "냉정한",
  "무표정한",
  "계산적인",
  "비인간적인",
  "냉철한",
  "실리적인",
  "기계적인",
  "변덕스러운",
  "예측 불가한",
  "양면적인",
  "무심한",
  "복잡한",
  "다층적인",
  "명랑한",
  "적극적인",
  "열정적인",
  "용감한",
  "대담한",
  "당당한",
  "생기발랄한",
  "패기 있는",
  "침착한",
  "느긋한",
  "과묵한",
  "이타적인",
  "붙임성 좋은",
  "수줍음 많은",
  "솔직한",
  "직설적인",
  "겸손한",
  "책임감 강한",
  "성실한",
  "정직한",
  "세심한",
  "끈기있는",
  "꼼꼼한",
  "우직한",
  "헌신적인",
  "자기 절제적인",
  "섬세한",
  "냉소적인",
  "까다로운",
  "고집 센",
  "이기적인",
  "무뚝뚝한",
  "우유부단한",
  "소심한",
  "독립적인",
  "엉뚱한",
  "순수한",
  "치밀한",
];

const appearance_trait = [
  "짙은 눈썹이",
  "날카로운 눈매가",
  "주근깨가",
  "눈가의 상처가",
  "얼굴의 상처가",
  "이마의 상처가",
  "밝은 색의 눈동자가",
  "투명한 피부가",
  "깨끗한 피부가",
  "긴 속눈썹이",
  "짙은 다크서클이",
  "눈 밑 점이",
  "큰 귀가",
  "곱슬머리가",
  "눈을 덮는 앞머리가",
  "동그란 두상이",
  "팔의 문신이",
  "다리의 문신이",
  "등의 문신이",
  "목의 문신이",
  "손의 문신이",
  "얇은 입술이",
  "도톰한 입술이",
  "보조개가",
  "인디언 보조개가",
  "높은 콧대가",
  "뚜렷한 턱선이",
  "두꺼처진 눈매가",
  "까무잡잡한 피부가",
  "은은한 홍조가",
  "긴 손가락이",
  "긴 목이",
  "넓은 어깨가",
  "홑꺼풀의 눈이",
  "손목의 흉터가",
  "볼의 점이",
  "낮은 목소리가",
  "높은 목소리가",
  "곧은 자세가",
  "쌍꺼풀이 짙은 눈이",
  "특이한 걸음걸이가",
  "어두운 눈동자가",
  "들창코가",
  "곧은 눈썹이",
  "삼백안이",
  "반쯤 감긴 눈이",
  "뾰족한 귀가",
  "큰 손발이",
];

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
  return Math.random().toString(36).substr(2, 9);
}
