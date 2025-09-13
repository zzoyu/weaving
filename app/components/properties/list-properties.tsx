"use client";

import AddIcon from "@/public/assets/icons/add.svg";
import { EPropertyType, Property } from "@/types/character";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setLocalProperties(properties);
  }, [properties]);

  console.log(errors);
  function reorder(list: Property[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  function onDragEnd(result: DropResult) {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    const newList = reorder(localProperties, source.index, destination.index);
    setLocalProperties(newList);
    handler(newList);
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="properties-droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {localProperties.map((property, index) => (
                <Draggable
                  key={`property-${index}-${property.key}`}
                  draggableId={`property-${index}-${property.key}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-2"
                    >
                      <ListPropertiesItem
                        property={property}
                        error={errors?.[index]?.value?.message}
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
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
