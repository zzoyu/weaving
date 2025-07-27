"use client";

import { Textarea } from "@/components/ui/textarea";
import DeleteIcon from "@/public/assets/icons/delete.svg";
import { Property } from "@/types/character";
import { useEffect, useRef, useState } from "react";

export default function ListPropertiesItem({
  property,
  onChange,
  onDelete,
}: {
  property: Property;
  onChange: (property: Property) => void;
  onDelete: (property: Property) => void;
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
        {isExpanded ? (
          <Textarea
            ref={textareaRef}
            className="w-full text-left p-1 border-background-muted focus:outline-none bg-transparent resize-none h-auto overflow-hidden"
            value={property.value}
            onChange={(event) => {
              onChange({ ...property, value: event.target.value });
              if (event.target.value.length <= 20) {
                setIsExpanded(false);
              }
              if (textareaRef.current) {
                textareaRef.current.style.height = "auto"; // Reset height to auto to allow expansion
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
              }
            }}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            className="w-full text-center p-1 border-background-muted focus:outline-none"
            value={property.value}
            onChange={(event) => {
              onChange({ ...property, value: event.target.value });
              if (event.target.value.length > 20) {
                setIsExpanded(true);
              }
            }}
          />
        )}
      </div>
      <button
        className="absolute right-0 visible md:invisible md:group-hover:visible"
        type="button"
        onClick={() => {
          onDelete(property);
        }}
      >
        <DeleteIcon className=" text-background-dark" width={28} height={28} />
      </button>
    </div>
  );
}
