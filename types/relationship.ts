import { Character } from "./character";

import urlFamily from "@/public/assets/icons/relationship/family.svg?url";
import urlFriend from "@/public/assets/icons/relationship/friend.svg?url";
import urlHate from "@/public/assets/icons/relationship/hate.svg?url";
import urlLove from "@/public/assets/icons/relationship/love.svg?url";
import { Clover, Heart, Swords, Users } from "lucide-react";

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
  relationship_in?: string;
  relationship_out?: string;
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
  [ERelationshipType.FRIEND]: Clover,
  [ERelationshipType.FAMILY]: Users,
  [ERelationshipType.LOVE]: Heart,
  [ERelationshipType.HATE]: Swords,
};

export const relationshipTypeData = {
  [ERelationshipType.FRIEND]: {
    label: "Friend",
    value: ERelationshipType.FRIEND,
    symbol: Clover,
    color: "bg-symbol-friend",
    url: urlFriend,
    hexColor: "#F5B84C",
  },
  [ERelationshipType.FAMILY]: {
    label: "Family",
    value: ERelationshipType.FAMILY,
    symbol: Users,
    color: "bg-symbol-family",
    url: urlFamily,
    hexColor: "#4AAE7A",
  },
  [ERelationshipType.LOVE]: {
    label: "Love",
    value: ERelationshipType.LOVE,
    symbol: Heart,
    color: "bg-symbol-love",
    url: urlLove,
    hexColor: "#7D9AE5",
  },
  [ERelationshipType.HATE]: {
    label: "Hate",
    value: ERelationshipType.HATE,
    symbol: Swords,
    color: "bg-symbol-hate",
    url: urlHate,
    hexColor: "#E15A5A",
  },
};
