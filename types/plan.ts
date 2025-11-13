export type PlanFeature =
  | "character.lock"
  | "character.custom-color"
  | "character.stats";
// 필요한 다른 feature들 추가

export interface PlanLimit {
  showAds: boolean;
  availableFeatures: PlanFeature[];
  maxCharacterSlots: number;
  maxUniverseSlots: number;
  maxImagesPerCharacter: number;
  maxRelationshipsPerCharacter: number;
  maxCharactersInUniverse: number;
  maxPropertiesPerCharacter: number;
}

export interface Plan {
  id: number;
  name: string;
  price_krw: number;
  price_usd: number;
  limit: PlanLimit;
}
