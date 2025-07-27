"use client";

import AddIcon from "@/public/assets/icons/add.svg";
import { EPropertyType, Property } from "@/types/character";
import { useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import ListPropertiesItem from "./list-properties-item";

export default function ListProperties({
  properties,
  handler,
  errors,
}: {
  properties: Property[];
  handler: (properties: Property[]) => void;
  errors?: Merge<FieldError, FieldErrorsImpl<Property[]>>;
}) {
  const [localProperties, setLocalProperties] =
    useState<Property[]>(properties);
  console.log(errors);
  return (
    <div className="flex flex-col gap-2 w-full">
      {localProperties.map((property, index) => (
        <ListPropertiesItem
          key={`key-value-${index}`}
          property={property}
          onChange={(property) => {
            const newValue = structuredClone(localProperties);
            newValue[index] = property;
            setLocalProperties(newValue);
            handler(newValue);
          }}
          onDelete={(property) => {
            const newProperties = [...localProperties];
            newProperties.splice(index, 1);
            handler(newProperties);
            setLocalProperties(newProperties);
          }}
          error={errors?.[index]?.message}
        />
      ))}
      <div className="flex justify-center p-2">
        <button
          type="button"
          onClick={() =>
            setLocalProperties([
              ...localProperties,
              { key: "", value: "", type: EPropertyType.STRING },
            ])
          }
        >
          <AddIcon
            className="text-primary-200 text-background-dark"
            width={28}
            height={28}
          />
        </button>
      </div>
    </div>
  );
}
