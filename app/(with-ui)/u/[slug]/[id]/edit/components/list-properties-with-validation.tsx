"use client";

import ListProperties from "@/app/components/properties/list-properties";
import { Property } from "@/types/character";

interface ListPropertiesWithValidationProps {
  properties: Property[];
  handler: (properties: Property[]) => void;
  getPropertyError: (
    index: number,
    field: "key" | "value"
  ) => string | undefined;
  getLengthError: () => string | null;
}

export default function ListPropertiesWithValidation({
  properties,
  handler,
  getPropertyError,
  getLengthError,
}: ListPropertiesWithValidationProps) {
  // errors prop을 ListProperties가 기대하는 형태로 변환
  const formattedErrors = properties.map((_, index) => {
    const keyError = getPropertyError(index, "key");
    const valueError = getPropertyError(index, "value");
    const lengthError = getLengthError();

    if (keyError || valueError || lengthError) {
      return {
        message: keyError || valueError || lengthError || "",
        key: keyError ? { message: keyError } : undefined,
        value: valueError ? { message: valueError } : undefined,
      };
    }
    return undefined;
  });

  return (
    <ListProperties
      properties={properties}
      handler={handler}
      errors={formattedErrors as any}
    />
  );
}
