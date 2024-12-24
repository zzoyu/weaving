import { symbol } from "d3";
import { Character } from "./character";

import SymbolFamily from "@/public/assets/icons/relationship/family.svg";
import SymbolFriend from "@/public/assets/icons/relationship/friend.svg";
import SymbolHate from "@/public/assets/icons/relationship/hate.svg";
import SymbolLove from "@/public/assets/icons/relationship/love.svg";

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
  {
    label: "Friend",
    value: ERelationshipType.FRIEND,
    symbol: SymbolFriend,
    color: "bg-primary-100",
  },
  {
    label: "Family",
    value: ERelationshipType.FAMILY,
    symbol: SymbolFamily,
    color: "bg-primary-100",
  },
  {
    label: "Love",
    value: ERelationshipType.LOVE,
    symbol: SymbolLove,
    color: "bg-primary-100",
  },
  {
    label: "Hate",
    value: ERelationshipType.HATE,
    symbol: SymbolHate,
    color: "bg-primary-100",
  },
];
