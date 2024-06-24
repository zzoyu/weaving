import { Character } from "./character";

export interface Relationship {
  id: number;
  name: string;
  from_id: number;
  to_id: number;
  character?:
    | Pick<Character, "id" | "name" | "thumbnail">[]
    | Pick<Character, "id" | "name" | "thumbnail">;
}

export enum ERelationshipType {
  FRIEND = "friend",
  FAMILY = "family",
  LOVE = "love",
  HATE = "hate",
}
