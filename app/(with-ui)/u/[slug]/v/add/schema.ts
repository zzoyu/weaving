import { EPropertyType, Property } from "@/types/character";
import { PlanLimit } from "@/types/plan";
import { Relationship } from "@/types/relationship";
import { z } from "zod";

const propertySchema = z.object({
  key: z.string().min(1, "키는 필수입니다"),
  value: z.string().length(2000, "최대 2000자 이하여야 합니다").optional(),
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
      .max(50, "이름은 50자 이하여야 합니다"),
    description: z.string().max(200, "설명은 200자 이하여야 합니다").optional(),
    profile_slug: z.string(),
    properties: z.array(propertySchema).max(
      planLimit.maxPropertiesPerCharacter + 3, // 색상 값 제외
      `속성은 최대 ${planLimit.maxPropertiesPerCharacter}개까지 추가할 수 있습니다`
    ),
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
