export type PlanFeature = 
  | 'character.lock'
  // 필요한 다른 feature들 추가

export interface PlanLimit {
  showAds: boolean;
  availableFeatures: PlanFeature[];
  maxCharacterSlots: number;
  maxImagesPerCharacter: number;
  maxRelationshipsPerCharacter: number;
}

export interface Plan {
  id: number;
  name: string;
  limit: PlanLimit;
  price_krw: number;
  price_usd: number;
} 