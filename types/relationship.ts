import { symbol } from "d3";
import { Character } from "./character";

export interface Relationship {
  id: number;
  name: string;
  from_id: number;
  to_id: number;
  character?: Pick<Character, "id" | "name" | "thumbnail">;
}

export enum ERelationshipType {
  FRIEND = "friend",
  FAMILY = "family",
  LOVE = "love",
  HATE = "hate",
}

export const relationshipTypeList = [
  { label: "Friend", value: ERelationshipType.FRIEND, symbol: "" },
  { label: "Family", value: ERelationshipType.FAMILY },
  { label: "Love", value: ERelationshipType.LOVE },
  { label: "Hate", value: ERelationshipType.HATE },
];
