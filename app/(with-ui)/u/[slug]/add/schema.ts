import { EPropertyType, Property } from "@/types/character";
import { PlanLimit } from "@/types/plan";
import { Relationship } from "@/types/relationship";
import { z } from "zod";

const propertySchema = z.object({
  key: z.string().min(1, "키는 필수입니다"),
  value: z.string().max(1500, "최대 1500자 이하여야 합니다"),
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
      .refine((value) => {
        const filtered = value.filter((i) => i.type !== EPropertyType.COLOR);
        return filtered.length <= 25;
      }, "속성은 최대 25개까지 추가할 수 있습니다")
      .refine((value) => {
        const invalidProperty = value.find((i) => i.value.length > 1500);
        if (invalidProperty) {
          return false;
        }
        return true;
      }, "속성 값은 최대 1500자 이하여야 합니다"),
    relationships: z
      .array(relationshipSchema)
      .max(
        planLimit.maxRelationshipsPerCharacter,
        `관계는 최대 ${planLimit.maxRelationshipsPerCharacter}개까지 추가할 수 있습니다`
      ),
    hashtags: z.string().refine((value) => {
      if (!value) return true;
      const tags = value.split(" ");
      return tags.length <= 20;
    }, "해시태그는 최대 20개까지 추가할 수 있습니다"),
  });

export type CreateCharacterFormData = {
  name: string;
  description?: string;
  profile_slug: string;
  properties: Property[];
  relationships: Relationship[];
  hashtags?: string;
};
