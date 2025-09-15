"use client";

import AddIcon from "@/public/assets/icons/add.svg";
import { EPropertyType, Property } from "@/types/character";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
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

  useEffect(() => {
    setLocalProperties(properties);
  }, [properties]);

  console.log(errors);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const sensors = useSensors(useSensor(PointerSensor));

  function findIndexById(id: string | null | undefined) {
    if (!id) return -1;
    return localProperties.findIndex((p) => `property-${p.key}` === id);
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
    // const rect = event.active.rect.current.translated;
    setOffsetX((event.activatorEvent as DragEvent).x);
    setOffsetY((event.activatorEvent as DragEvent).y);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;
    const oldIndex = findIndexById(active.id as string);
    const newIndex = findIndexById(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;
    if (oldIndex === newIndex) return;

    const newList = arrayMove(localProperties, oldIndex, newIndex);
    setLocalProperties(newList);
    handler(newList);
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* 여기 DragOverlay 추가 */}
        <DragOverlay
          modifiers={[
            ({ transform }) => {
              if (!transform) return transform;
              return {
                ...transform,
                x: offsetX || transform.x || 0,
                y: offsetY || transform.y || 0,
              };
            },
          ]}
        >
          {activeId ? (
            <SmallPreview
              property={
                localProperties.find(
                  (p) => `property-${p.key}` === activeId
                ) as Property
              }
            />
          ) : null}
        </DragOverlay>
        <SortableContext
          items={localProperties.map((p) => `property-${p.key}`)}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {localProperties.map((property, index) => (
              <SortableItem
                key={`property-${property.key}`}
                id={`property-${property.key}`}
                index={index}
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
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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

function SortableItem({
  id,
  index,
  property,
  error,
  onChange,
  onDelete,
}: {
  id: string;
  index: number;
  property: Property;
  error?: string;
  onChange: (property: Property) => void;
  onDelete: (property: Property) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    data,
  } = useSortable({ id });

  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>();

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      // if (isDragging) {
      // }
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const translate = transform
    ? `translate3d(${Math.round(
        cursorPosition?.x || transform.x || 0
      )}px, ${Math.round(cursorPosition?.y || (transform as any).y || 0)}px, 0)`
    : undefined;

  const style: React.CSSProperties = {
    transform: translate,
    transition: transition ?? undefined,
    zIndex: isDragging ? 9999 : undefined,
    touchAction: "none",
    transformOrigin: "top left",
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-2 relative">
      <ListPropertiesItem
        property={property}
        error={error}
        onChange={onChange}
        onDelete={onDelete}
        // pass drag handle props as expected by ListPropertiesItem
        listeners={{ ...listeners }}
        attributes={{ ...attributes }}
        isDragging={isDragging}
      />
    </div>
  );
}
