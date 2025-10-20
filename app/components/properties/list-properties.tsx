"use client";

import AddIcon from "@/public/assets/icons/add.svg";
import { EPropertyType, Property } from "@/types/character";

import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion";
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
  const [activeId, setActiveId] = useState<string | null>(null);

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
                    handleMove={(index: number, amount: number) => {
                      const newProperties = [...localProperties];
                      const [movedItem] = newProperties.splice(index, 1);
                      newProperties.splice(
                        Math.min(
                          Math.max(index + amount, 0),
                          newProperties.length
                        ),
                        0,
                        movedItem
                      );
                      setLocalProperties(newProperties);
                      handler(newProperties);
                    }}
                  />
                </motion.div>
              ))}
              <ButtonAddProperty
                clickHandler={() => {
                  setLocalProperties([
                    ...localProperties,
                    {
                      key: "",
                      value: "",
                      type: EPropertyType.STRING,
                      uuid: crypto.randomUUID(),
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
  handleMove,
}: {
  id: string;
  index: number;
  property: Property;
  error?: string;
  onChange: (property: Property) => void;
  onDelete: (property: Property) => void;
  handleMove: (index: number, amount: number) => void;
}) {
  const { ref, isDragging } = useSortable({
    id,
    index,
  });

  return (
    <div
      ref={ref}
      className={isDragging ? "mb-4 relative h-20 opacity-40" : "mb-2 relative"}
    >
      {isDragging === false ? (
        <ListPropertiesItem
          property={property}
          error={error}
          onChange={onChange}
          onDelete={onDelete}
          handleMove={(amount) => {
            handleMove(index, amount);
          }}
        />
      ) : (
        <SmallPreview property={property} />
        // <div className="h-20 bg-background-dark rounded" />
      )}
    </div>
  );
}
