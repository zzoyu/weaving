import { EPropertyType, Property } from "@/types/character";
import { PlanLimit } from "@/types/plan";
import { Relationship } from "@/types/relationship";
import { z } from "zod";

const propertySchema = z.object({
  key: z.string().min(1, "키는 필수입니다"),
  value: z.string().length(1500, "최대 1500자 이하여야 합니다").optional(),
  type: z.nativeEnum(EPropertyType),
});

const relationshipSchema = z.object({
  to_id: z.number(),
  name: z.string().min(1, "관계 이름은 필수입니다"),
});

export const createCharacterSchema = (planLimit: PlanLimit) =>
  z.object({
    name: z
      .string()
      .min(1, "이름은 필수입니다")
      .max(20, "이름은 20자 이하여야 합니다"),
    description: z.string().max(30, "설명은 30자 이하여야 합니다").optional(),
    profile_slug: z.string(),
    properties: z
      .array(propertySchema)
      .length(25, "속성은 최대 25개까지 추가할 수 있습니다"),
    relationships: z
      .array(relationshipSchema)
      .max(
        planLimit.maxRelationshipsPerCharacter,
        `관계는 최대 ${planLimit.maxRelationshipsPerCharacter}개까지 추가할 수 있습니다`
      ),
    hashtags: z.string().optional(),
  });

export type CreateCharacterFormData = {
  name: string;
  description?: string;
  profile_slug: string;
  properties: Property[];
  relationships: Relationship[];
  hashtags?: string;
};
