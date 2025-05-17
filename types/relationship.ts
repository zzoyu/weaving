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
}

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
  },
  [ERelationshipType.FAMILY]: {
    label: "Family",
    value: ERelationshipType.FAMILY,
    symbol: SymbolFamily,
    color: "bg-symbol-family",
    url: urlFamily,
  },
  [ERelationshipType.LOVE]: {
    label: "Love",
    value: ERelationshipType.LOVE,
    symbol: SymbolLove,
    color: "bg-symbol-love",
    url: urlLove,
  },
  [ERelationshipType.HATE]: {
    label: "Hate",
    value: ERelationshipType.HATE,
    symbol: SymbolHate,
    color: "bg-symbol-hate",
    url: urlHate,
  },
};
