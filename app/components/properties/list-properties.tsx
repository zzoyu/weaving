"use client";

import AddIcon from "@/public/assets/icons/add.svg";
import { EPropertyType, Property } from "@/types/character";

import { cn } from "@/lib/utils";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import ListPropertiesItem from "./list-properties-item";

// 간단한 ID 생성 함수
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function ListProperties({
  properties,
  handler,
  errors,
  disabled,
}: {
  properties: Property[];
  handler: (properties: Property[]) => void;
  errors?: Merge<FieldError, FieldErrorsImpl<Property[]>>[] & {
    lengthError?: { message: string };
  };
  disabled?: boolean;
}) {
  const [localProperties, setLocalProperties] =
    useState<Property[]>(properties);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Move property function
  const moveProperty = (fromIndex: number, amount: number) => {
    const newProperties = [...localProperties];
    const targetIndex = Math.min(
      Math.max(fromIndex + amount, 0),
      newProperties.length - 1
    );

    if (fromIndex !== targetIndex) {
      const [movedItem] = newProperties.splice(fromIndex, 1);
      newProperties.splice(targetIndex, 0, movedItem);
      setLocalProperties(newProperties);
      handler(newProperties);
    }
  };

  useEffect(() => {
    setLocalProperties(properties);
  }, [properties]);

  function findIndexById(id: string | null | undefined) {
    if (!id) return -1;
    return localProperties.findIndex((p) => `property-${p.uuid}` === id);
  }

  const activeProperty = activeId
    ? localProperties[findIndexById(activeId)]
    : null;

  return (
    <DragDropProvider
      onDragStart={(event) => {
        setActiveId(event.operation.source?.id?.toString() || null);
      }}
      onDragEnd={(event) => {
        const overId = event.operation.target?.id;
        const activeIndex = findIndexById(
          event.operation.source?.id?.toString()
        );
        const overIndex = findIndexById(overId?.toString());

        if (
          activeIndex !== -1 &&
          overIndex !== -1 &&
          activeIndex !== overIndex
        ) {
          const newProperties = [...localProperties];
          const [movedItem] = newProperties.splice(activeIndex, 1);
          newProperties.splice(overIndex, 0, movedItem);
          setLocalProperties(newProperties);
          handler(newProperties);
        }

        setActiveId(null);
      }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div>
          <div>
            <SortableContext
              items={localProperties.map((p) => `property-${p.uuid}`)}
              strategy={verticalListSortingStrategy}
              disabled={disabled}
            >
              {localProperties.map((property, index) => (
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  key={`property-${property.uuid}`}
                >
                  <SortableItem
                    key={`property-${property.uuid}`}
                    id={`property-${property.uuid}`}
                    index={index}
                    property={property}
                    error={errors ? (errors[index] as any)?.message : undefined}
                    keyError={
                      errors ? (errors[index] as any)?.key?.message : undefined
                    }
                    valueError={
                      errors
                        ? (errors[index] as any)?.value?.message
                        : undefined
                    }
                    onChange={(newProperty) => {
                      const newProperties = [...localProperties];
                      newProperties[index] = {
                        ...newProperty,
                        uuid: property.uuid,
                      };
                      setLocalProperties(newProperties);
                      handler(newProperties);
                    }}
                    onDelete={(propertyToDelete) => {
                      const newProperties = localProperties.filter(
                        (p) => p.uuid !== propertyToDelete.uuid
                      );
                      setLocalProperties(newProperties);
                      handler(newProperties);
                    }}
                    moveProperty={moveProperty}
                  />
                </motion.div>
              ))}
              {errors?.lengthError && (
                <p className="text-red-500">{errors.lengthError.message}</p>
              )}
              <ButtonAddProperty
                disabled={errors?.lengthError != null}
                clickHandler={() => {
                  setLocalProperties([
                    ...localProperties,
                    {
                      key: "",
                      value: "",
                      type: EPropertyType.STRING,
                      uuid: generateId(),
                    },
                  ]);
                }}
              />
            </SortableContext>
          </div>
        </div>
      </div>
    </DragDropProvider>
  );
}

function ButtonAddProperty({
  clickHandler,
  disabled = false,
}: {
  clickHandler: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex justify-center p-2">
      <button type="button" onClick={clickHandler} disabled={disabled}>
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
  keyError,
  valueError,
  onChange,
  onDelete,
  moveProperty,
}: {
  id: string;
  index: number;
  property: Property;
  error?: string;
  keyError?: string;
  valueError?: string;
  onChange: (property: Property) => void;
  onDelete: (property: Property) => void;
  moveProperty: (fromIndex: number, amount: number) => void;
}) {
  const { ref, isDragging, handleRef } = useSortable({
    id,
    index,
  });

  return (
    <div
      ref={ref}
      className={cn(isDragging ? "mb-4 relative opacity-40" : "mb-2 relative")}
    >
      <ListPropertiesItem
        property={property}
        error={error}
        keyError={keyError}
        valueError={valueError}
        onChange={onChange}
        onDelete={onDelete}
        isDragging={isDragging}
        dragHandleRef={handleRef}
        handleMove={(amount) => {
          console.log(
            "SortableItem handleMove called with amount:",
            amount,
            "index:",
            index
          );
          moveProperty(index, amount);
        }}
      />
    </div>
  );
}
