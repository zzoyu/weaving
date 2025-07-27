"use client";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { cn } from "@/lib/utils";
import DeleteIcon from "@/public/assets/icons/delete.svg";
import { Property } from "@/types/character";
import { CircleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ListPropertiesItem({
  property,
  onChange,
  onDelete,
  error,
}: {
  property: Property;
  onChange: (property: Property) => void;
  onDelete: (property: Property) => void;
  error?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded) {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    } else {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [isExpanded]);

  return (
    <div className="w-full h-fit relative flex items-center justify-center group">
      <div className="w-full flex gap-4">
        <input
          type="hidden"
          name="list-properties"
          value={`${property.key}:${property.value}`}
        />
        <input
          className="w-1/3 text-center p-1  border-background-muted focus:outline-none"
          type="text"
          value={property.key}
          onChange={(event) => {
            onChange({ ...property, key: event.target.value });
          }}
        />
        <div className="flex relative flex-1 flex-col">
          <div className="flex items-center">
            <AutosizeTextarea
              minHeight={16}
              className={cn(
                "w-full p-1 border-background-muted focus:outline-none bg-transparent resize-none focus:ring-0 ring-0 active:ring-0 active:border-none",
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
  );
}
