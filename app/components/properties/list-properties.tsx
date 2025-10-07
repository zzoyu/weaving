"use client";

import AddIcon from "@/public/assets/icons/add.svg";
import { EPropertyType, Property } from "@/types/character";

import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useEffect, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import ListPropertiesItem, { SmallPreview } from "./list-properties-item";

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
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setLocalProperties(properties);
  }, [properties]);

  function findIndexById(id: string | null | undefined) {
    if (!id) return -1;
    return localProperties.findIndex((p) => `property-${p.key}` === id);
  }

  return (
    <DragDropProvider
      onBeforeDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div>
          {localProperties.map((property, index) => (
            <SortableItem
              key={`property-${index}-${property.key}`}
              id={`property-${property.key}_${index}`}
              index={index}
              property={property}
              error={errors ? (errors[index] as any)?.message : undefined}
              isDragging={isDragging}
              onChange={(newProperty) => {
                const newProperties = [...localProperties];
                newProperties[index] = newProperty;
                setLocalProperties(newProperties);
                handler(newProperties);
              }}
              onDelete={(propertyToDelete) => {
                const newProperties = localProperties.filter(
                  (p) => p.key !== propertyToDelete.key
                );
                setLocalProperties(newProperties);
                handler(newProperties);
              }}
            />
          ))}
          <ButtonAddProperty
            clickHandler={() => {
              setLocalProperties([
                ...localProperties,
                { key: "", value: "", type: EPropertyType.STRING },
              ]);
            }}
          />
        </div>
      </div>
    </DragDropProvider>
  );
}

function ButtonAddProperty({ clickHandler }: { clickHandler: () => void }) {
  return (
    <div className="flex justify-center p-2">
      <button type="button" onClick={clickHandler}>
        <AddIcon
          className="text-primary-200 text-background-dark"
          width={28}
          height={28}
        />
      </button>
    </div>
  );
}

function SortableItem({
  id,
  index,
  property,
  error,
  onChange,
  onDelete,
  isDragging = false,
}: {
  id: string;
  index: number;
  property: Property;
  error?: string;
  onChange: (property: Property) => void;
  onDelete: (property: Property) => void;
  isDragging?: boolean;
}) {
  const { ref } = useSortable({
    id,
    index,
  });

  return (
    <div ref={ref} className="mb-2 relative">
      {isDragging === false ? (
        <ListPropertiesItem
          property={property}
          error={error}
          onChange={onChange}
          onDelete={onDelete}
        />
      ) : (
        <SmallPreview property={property} />
      )}
    </div>
  );
}
