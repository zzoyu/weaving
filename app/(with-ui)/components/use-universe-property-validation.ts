import { UNIVERSE_SCHEMA_VALUES } from "@/lib/schema/universe-form-schema";
import { Property } from "@/types/universe";
import { useMemo } from "react";

export function useUniversePropertyValidation(properties: Property[]) {
  const validationErrors = useMemo(() => {
    const errors: { [index: number]: { key?: string; value?: string } } = {};

    // 개별 property validation
    properties.forEach((property, index) => {
      const propertyErrors: { key?: string; value?: string } = {};

      // key validation
      if (!property.key || property.key.trim().length === 0) {
        if (property.value && property.value.trim().length > 0) {
          propertyErrors.key = "필수 입력값입니다";
        }
      } else {
        if (property.key.length > UNIVERSE_SCHEMA_VALUES.maxKeyLength) {
          propertyErrors.key = `${UNIVERSE_SCHEMA_VALUES.maxKeyLength}자 이하여야 합니다`;
        }
        if (property.key.trim().length === 0) {
          propertyErrors.key = "공백만 입력할 수 없습니다";
        }
      }

      // value validation
      if (
        property.value &&
        property.value.length > UNIVERSE_SCHEMA_VALUES.maxValueLength
      ) {
        propertyErrors.value = `최대 ${UNIVERSE_SCHEMA_VALUES.maxValueLength}자 이하여야 합니다`;
      }

      if (Object.keys(propertyErrors).length > 0) {
        errors[index] = propertyErrors;
      }
    });
    const keyMap = new Map<string, number[]>();

    properties.forEach((property, originalIndex) => {
      const actualIndex = properties.indexOf(property);
      if (property.key && property.key.trim().length > 0) {
        const normalizedKey = property.key.trim().toLowerCase();
        if (!keyMap.has(normalizedKey)) {
          keyMap.set(normalizedKey, []);
        }
        keyMap.get(normalizedKey)!.push(actualIndex);
      }
    });

    // 중복된 키들에 대해 에러 추가
    keyMap.forEach((indices, key) => {
      if (indices.length > 1) {
        indices.forEach((index) => {
          if (!errors[index]) {
            errors[index] = {};
          }
          errors[index].key = "중복된 키입니다";
        });
      }
    });

    return errors;
  }, [properties]);

  const hasErrors = Object.keys(validationErrors).length > 0;

  const getPropertyError = (index: number, field: "key" | "value") => {
    return validationErrors[index]?.[field];
  };

  return {
    validationErrors,
    hasErrors,
    getPropertyError,
  };
}
