import { Property } from "@/types/character";
import { useMemo } from "react";

enum EPropertyType {
  STRING = "string",
  COLOR = "color",
  DATE = "date",
}

export function usePropertyValidation(properties: Property[]) {
  const validationErrors = useMemo(() => {
    const errors: { [index: number]: { key?: string; value?: string } } = {};

    // 개별 property validation
    properties.forEach((property, index) => {
      const propertyErrors: { key?: string; value?: string } = {};

      // key validation
      if (property.type !== EPropertyType.COLOR) {
        if (!property.key || property.key.trim().length === 0) {
          if (property.value && property.value.trim().length > 0) {
            propertyErrors.key = "필수 입력값입니다";
          }
        } else {
          if (property.key.length > 50) {
            propertyErrors.key = "50자 이하여야 합니다";
          }
          if (property.key.trim().length === 0) {
            propertyErrors.key = "공백만 입력할 수 없습니다";
          }
        }
      }

      // value validation
      if (property.value && property.value.length > 1500) {
        propertyErrors.value = "최대 1500자 이하여야 합니다";
      }

      if (Object.keys(propertyErrors).length > 0) {
        errors[index] = propertyErrors;
      }
    });

    // 중복 키 validation
    const nonColorProperties = properties.filter(
      (p) => p.type !== EPropertyType.COLOR
    );
    const keyMap = new Map<string, number[]>();

    nonColorProperties.forEach((property, originalIndex) => {
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
          errors[index].key = "중복된 속성입니다";
        });
      }
    });

    return errors;
  }, [properties]);

  const lengthError = useMemo(() => {
    const count = properties.filter(
      (p) => p.type !== EPropertyType.COLOR
    ).length;
    if (count > 25) {
      return "속성은 최대 25개까지 추가할 수 있습니다";
    }
    return null;
  }, [properties]);

  const hasErrors =
    Object.keys(validationErrors).length > 0 || lengthError !== null;

  const getPropertyError = (index: number, field: "key" | "value") => {
    return validationErrors[index]?.[field];
  };

  const getLengthError = () => {
    return lengthError;
  };

  return {
    validationErrors,
    hasErrors,
    getPropertyError,
    getLengthError,
  };
}
export type PropertyValidationErrors = {
  [index: number]: {
    key?: string;
    value?: string;
  };
};
