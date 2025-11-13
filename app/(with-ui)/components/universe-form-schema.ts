import { Property } from "@/types/character";
import { Plan } from "@/types/plan";
import { z } from "zod";

enum EPropertyType {
  STRING = "string",
  COLOR = "color",
  DATE = "date",
  STAT = "stat",
}

const propertySchema = z.object({
  key: z
    .string()
    .min(1, "필수 입력입니다")
    .max(50, "50자 이하여야 합니다")
    .refine((value) => value.trim().length > 0, "공백만 입력할 수 없습니다"),
  value: z.string().max(1500, "최대 1500자 이하여야 합니다"),
  type: z.nativeEnum(EPropertyType),
});

const characterUniverseSchema = z.object({
  character_id: z.number(),
});

export const universeFormSchema = (plan: Plan) =>
  z.object({
    name: z
      .string()
      .min(1, "세계관 이름은 필수입니다")
      .max(50, "세계관 이름은 50자 이하여야 합니다"),
    description: z.string().max(200, "설명은 200자 이하여야 합니다").optional(),
    properties: z
      .array(propertySchema)
      .max(25, "속성은 최대 25개까지 추가할 수 있습니다")
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
    characterUniverses: z
      .array(characterUniverseSchema)
      .max(
        plan.limit.maxCharactersInUniverse,
        `최대 ${plan.limit.maxCharactersInUniverse}개의 캐릭터만 추가할 수 있습니다`
      ),
    hashtags: z.string().refine((value) => {
      if (!value) return true;
      const tags = value.trim().split(" ");
      return tags.length <= 20;
    }, "해시태그는 최대 20개까지 추가할 수 있습니다"),
  });

export type UniverseFormData = {
  name: string;
  description?: string;
  properties: Property[];
  characterUniverses: { character_id: number }[];
  hashtags: string;
};
