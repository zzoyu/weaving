import { EPropertyType, Property } from "@/types/character";
import { PlanLimit } from "@/types/plan";
import { Relationship } from "@/types/relationship";
import { z } from "zod";

const propertySchema = z.object({
  key: z
    .string()
    .min(1, "필수입니다")
    .max(50, "50자 이하여야 합니다")
    .refine((value) => value.trim().length > 0, "공백만 입력할 수 없습니다"),
  value: z.string().max(1500, "최대 1500자 이하여야 합니다"),
  type: z.nativeEnum(EPropertyType),
});

const relationshipSchema = z.object({
  to_id: z.number(),
  name: z.string().min(1, "관계 이름은 필수입니다"),
});

export const updateCharacterSchema = (planLimit: PlanLimit) =>
  z.object({
    name: z
      .string()
      .min(1, "이름은 필수입니다")
      .max(20, "이름은 20자 이하여야 합니다"),
    description: z.string().max(30, "설명은 30자 이하여야 합니다").optional(),
    properties: z
      .array(propertySchema)
      .refine((value) => {
        const filtered = value.filter(
          (i) => i.type !== EPropertyType.COLOR && i.type !== EPropertyType.STAT
        );
        return filtered.length <= 25;
      }, "속성은 최대 25개까지 추가할 수 있습니다")
      .refine((value) => {
        // 중복 키 체크 (빈 키는 제외)
        const keys = value
          .filter(
            (i) =>
              i.type !== EPropertyType.COLOR &&
              i.type !== EPropertyType.STAT &&
              i.key.trim().length > 0
          )
          .map((i) => i.key.trim().toLowerCase());
        const uniqueKeys = new Set(keys);
        return keys.length === uniqueKeys.size;
      }, "중복된 속성 키가 있습니다")
      .refine((value) => {
        // 빈 키가 있는 속성이 값도 가지고 있는지 체크
        const hasInvalidProperty = value.some(
          (i) =>
            i.type !== EPropertyType.COLOR &&
            i.type !== EPropertyType.STAT &&
            i.key.trim().length === 0 &&
            i.value.trim().length > 0
        );
        return !hasInvalidProperty;
      }, "키가 비어있는 속성은 값도 비워야 합니다"),
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

export type UpdateCharacterFormData = {
  name: string;
  description?: string;
  properties: Property[];
  relationships: Relationship[];
  hashtags?: string;
};
