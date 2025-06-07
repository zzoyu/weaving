import { Character } from "./character";

import SymbolFamily from "@/public/assets/icons/relationship/family.svg";
import SymbolFriend from "@/public/assets/icons/relationship/friend.svg";
import SymbolHate from "@/public/assets/icons/relationship/hate.svg";
import SymbolLove from "@/public/assets/icons/relationship/love.svg";

import urlFamily from "@/public/assets/icons/relationship/family.svg?url";
import urlFriend from "@/public/assets/icons/relationship/friend.svg?url";
import urlHate from "@/public/assets/icons/relationship/hate.svg?url";
import urlLove from "@/public/assets/icons/relationship/love.svg?url";

export interface Relationship {
  id?: number;
  name: string;
  from_id: number;
  to_id: number;
  character?: Pick<Character, "id" | "name" | "thumbnail">;
  relationship?: string;
  thumbnail?: string;
  depth?: number;
}

export type RelationshipNode = {
  id?: number;
  from_id: number;
  to_id: number;
  name: string;
  character?: {
    id?: number;
    name?: string;
    thumbnail: string;
  };
  relationship?: string;
  thumbnail?: string;
  depth?: number;
  children?: RelationshipNode[];
};

export enum ERelationshipType {
  FRIEND = "friend",
  FAMILY = "family",
  LOVE = "love",
  HATE = "hate",
}

export const relationshipSymbolList = {
  [ERelationshipType.FRIEND]: SymbolFriend,
  [ERelationshipType.FAMILY]: SymbolFamily,
  [ERelationshipType.LOVE]: SymbolLove,
  [ERelationshipType.HATE]: SymbolHate,
};

export const relationshipTypeData = {
  [ERelationshipType.FRIEND]: {
    label: "Friend",
    value: ERelationshipType.FRIEND,
    symbol: SymbolFriend,
    color: "bg-symbol-friend",
    url: urlFriend,
    hexColor: "#F5B84C",
  },
  [ERelationshipType.FAMILY]: {
    label: "Family",
    value: ERelationshipType.FAMILY,
    symbol: SymbolFamily,
    color: "bg-symbol-family",
    url: urlFamily,
    hexColor: "#4AAE7A",
  },
  [ERelationshipType.LOVE]: {
    label: "Love",
    value: ERelationshipType.LOVE,
    symbol: SymbolLove,
    color: "bg-symbol-love",
    url: urlLove,
    hexColor: "#7D9AE5",
  },
  [ERelationshipType.HATE]: {
    label: "Hate",
    value: ERelationshipType.HATE,
    symbol: SymbolHate,
    color: "bg-symbol-hate",
    url: urlHate,
    hexColor: "#E15A5A",
  },
};
