"use client";

import type { AutosizeTextAreaRef } from "@/components/ui/autosize-textarea";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { cn } from "@/lib/utils";
import DeleteIcon from "@/public/assets/icons/delete.svg";
import { Property } from "@/types/character";
import {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
// drag props may come from different dnd libs; accept a loose shape
import { CircleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function SmallPreview({ property }: { property: Property }) {
  const truncatedValue =
    property.value.length > 20
      ? property.value.substring(0, 20) + "..."
      : property.value;

  return (
    <div className="w-full h-12 relative flex items-center justify-center group bg-background-default dark:bg-neutral-900 rounded border shadow-md transform-gpu">
      <div className="w-full flex gap-2 items-center relative px-4">
        <span className="text-sm font-medium truncate">{property.key}</span>
        <span className="text-sm text-gray-500 truncate">
          : {truncatedValue}
        </span>
      </div>
    </div>
  );
}

export default function ListPropertiesItem({
  property,
  onChange,
  onDelete,
  error,
  isDragging = false,
  listeners,
  attributes,
}: {
  property: Property;
  onChange: (property: Property) => void;
  onDelete: (property: Property) => void;
  error?: string;
  isDragging?: boolean;
  listeners?: DraggableSyntheticListeners;
  attributes?: DraggableAttributes;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<AutosizeTextAreaRef | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  console.log("rendering item", property, isDragging, attributes, listeners);

  useEffect(() => {
    if (isExpanded) {
      // AutosizeTextarea exposes an imperative handle with a `focus` method
      // and the underlying textarea on `textArea`.
      // textareaRef.current!.focus?.();
      const ta = textareaRef.current?.textArea;
      if (ta) {
        ta.setSelectionRange(ta.value.length, ta.value.length);
      }
    } else {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [isExpanded]);
  // When dragging, show a compact preview (short height) similar to the
  // original behavior. This avoids the large full editor UI from showing
  // while the item is being dragged.
  if (isDragging) {
    const truncatedValue =
      property.value.length > 20
        ? property.value.substring(0, 20) + "..."
        : property.value;

    return (
      <div
        className="w-full h-12 relative flex items-center justify-center group bg-background-default dark:bg-neutral-900 rounded border shadow-md transform-gpu"
        {...(attributes || {})}
      >
        <div className="w-full flex gap-2 items-center relative px-4">
          <button
            type="button"
            {...(listeners || {})}
            className="flex-shrink-0"
            aria-label="drag-handle"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-background-dark"
            >
              <circle cx="5" cy="5" r="1.5" fill="currentColor" />
              <circle cx="5" cy="12" r="1.5" fill="currentColor" />
              <circle cx="5" cy="19" r="1.5" fill="currentColor" />
            </svg>
          </button>
          <span className="text-sm font-medium truncate">{property.key}</span>
          <span className="text-sm text-gray-500 truncate">
            : {truncatedValue}
          </span>
        </div>
      </div>
    );
  }

  // Always render the full item layout when not actively dragging.
  const containerClass = `w-full h-fit relative flex items-center justify-center group transform-gpu`;

  return (
    <div className={containerClass} {...(attributes || {})}>
      <div className="w-full flex gap-4 items-center relative">
        <button
          type="button"
          className="p-2 absolute left-0 h-full flex items-center justify-center"
          aria-label="drag-handle"
          {...(listeners || {})}
        >
          {/* simple grip dots */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-background-dark h-full"
          >
            <circle cx="5" cy="5" r="1.5" fill="currentColor" />
            <circle cx="5" cy="12" r="1.5" fill="currentColor" />
            <circle cx="5" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>

        <div className="flex-1 flex gap-4">
          <input
            type="hidden"
            name="list-properties"
            value={`${property.key}:${property.value}`}
          />
          <input
            className="w-1/3 text-center p-1  border-background-muted focus:outline-none"
            type="text"
            value={property.key}
            ref={inputRef}
            onChange={(event) => {
              onChange({ ...property, key: event.target.value });
            }}
          />

          <div className="flex relative flex-1 flex-col">
            <div className="flex items-center">
              <AutosizeTextarea
                ref={textareaRef}
                minHeight={16}
                className={cn(
                  "w-full p-1 border-background-muted focus:outline-none bg-background-default dark:bg-neutral-900 resize-none focus:ring-0 ring-0 ",
                  {
                    "border-state-error": error,
                  }
                )}
                value={property.value}
                onChange={(event) => {
                  onChange({ ...property, value: event.target.value });
                }}
              />
              <button
                className="absolute right-0 visible md:invisible md:group-hover:visible"
                type="button"
                onClick={() => {
                  onDelete(property);
                }}
              >
                <DeleteIcon
                  className=" text-background-dark"
                  width={28}
                  height={28}
                />
              </button>
            </div>
            {error && (
              <span className="text-red-500 text-sm flex items-center gap-1">
                <CircleAlert className="inline w-4 h-4" />
                {error}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
