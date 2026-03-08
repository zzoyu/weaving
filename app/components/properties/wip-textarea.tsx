"use client";

import { AutosizeTextAreaRef } from "@/components/ui/autosize-textarea";
import { cn } from "@/lib/utils";

import { Property } from "@/types/character";
import * as React from "react";
import PropertyTextarea from "./property-textarea";

export interface ExpandableTextareaProps {
  placeholder?: string;
  minCharacters?: number;
  maxCharacters?: number;
  className?: string;
  disabled?: boolean;
  property: Property;
  onChange: (property: Property) => void;
  onDelete: (property: Property) => void;
  error?: string;
  keyError?: string;
  valueError?: string;
  value?: string;
}

const ExpandableTextarea = React.forwardRef<
  HTMLDivElement,
  ExpandableTextareaProps
>(
  (
    {
      placeholder,
      value = "",
      onChange,
      className,
      disabled,
      error = false,
      valueError = false,
      keyError = false,
      property,
      onDelete,
    },
    ref,
  ) => {
    const editorRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const handleInput = () => {
      if (editorRef.current) {
        onChange?.({ ...property, value: editorRef.current.innerHTML });
      }
    };

    const handleFocus = () => {
      if (!disabled) {
        setIsExpanded(true);
      }
    };

    const handleBlur = (e: React.FocusEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.relatedTarget as Node)
      ) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            break;
          case "i":
            e.preventDefault();
            break;
          case "u":
            e.preventDefault();
            break;
        }
      }
    };

    const handleSelectionChange = React.useCallback(() => {
      if (isExpanded) {
      }
    }, [isExpanded]);

    React.useEffect(() => {
      document.addEventListener("selectionchange", handleSelectionChange);
      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
      };
    }, [handleSelectionChange]);

    React.useEffect(() => {
      if (
        editorRef.current &&
        value !== undefined &&
        editorRef.current.innerHTML !== value
      ) {
        editorRef.current.innerHTML = value;
      }
    }, [value]);

    const lineHeight = 24;
    const padding = 24;
    const minRows = 1;
    const maxRows = 500;

    const textareaRef = React.useRef<AutosizeTextAreaRef>(null);

    return (
      <div
        ref={containerRef}
        className={cn(
          "transition-all duration-200",
          isExpanded && "",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        onBlur={handleBlur}
      >
        <PropertyTextarea
          property={property}
          onChange={(updatedProperty: Property) => {
            onChange({ ...updatedProperty, value: updatedProperty.value });
          }}
        />
      </div>
    );
  },
);
ExpandableTextarea.displayName = "ExpandableTextarea";

export { ExpandableTextarea };
