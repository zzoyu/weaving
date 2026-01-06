import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autosize-textarea";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Property } from "@/types/character";
import {
  BoldIcon,
  CircleAlert,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { useRef } from "react";

interface PropertyTextareaProps {
  property: Property;
  keyError?: string;
  valueError?: string;
  error?: string;
  limit?: number;
  onChange: (updatedProperty: Property) => void;
  handleFocus: () => void;
  handleBlur: () => void;
}

export default function PropertyTextarea({
  property,
  keyError,
  valueError,
  onChange,
  handleFocus,
  handleBlur,
  error,
  limit,
}: PropertyTextareaProps) {
  const textareaRef = useRef<AutosizeTextAreaRef>(null);

  return (
    <div>
      <InputGroup
        className={cn(
          "w-full border ring-1 ring-neutral-950 dark:ring-neutral-300",
          { "ring-red-500": valueError || keyError }
        )}
        onClick={() => {
          textareaRef.current?.textArea.focus();
        }}
      >
        <AutosizeTextarea
          ref={textareaRef}
          data-slot="input-group-control"
          minHeight={16}
          className="border-none ring-0 outline-none resize-none "
          value={property.value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(event) => {
            onChange({ ...property, value: event.target.value });
          }}
        />
        <InputGroupAddon align="block-end">
          <div className="flex gap-1">
            <InputGroupButton
              variant="outline"
              className="rounded-sm"
              size="icon-xs"
            >
              <BoldIcon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className="rounded-sm"
              size="icon-xs"
            >
              <ItalicIcon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className="rounded-sm"
              size="icon-xs"
            >
              <UnderlineIcon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className="rounded-sm"
              size="icon-xs"
            >
              <StrikethroughIcon />
            </InputGroupButton>
          </div>
          <Separator orientation="vertical" className="!h-4" />
          <div className="flex gap-1">
            <InputGroupButton
              variant="outline"
              className="rounded-sm"
              size="icon-xs"
            >
              <Heading1Icon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className="rounded-sm"
              size="icon-xs"
            >
              <Heading2Icon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className="rounded-sm"
              size="icon-xs"
            >
              <Heading3Icon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className="rounded-sm"
              size="icon-xs"
            >
              <ListIcon />
            </InputGroupButton>
          </div>

          <InputGroupText className="ml-auto opacity-90 text-xs">
            {property.value.length}/{limit ?? "∞"}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {valueError && (
        <span className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <CircleAlert className="inline w-3 h-3" />
          {valueError}
        </span>
      )}
      {error && !keyError && !valueError && (
        <span className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <CircleAlert className="inline w-3 h-3" />
          {error}
        </span>
      )}
    </div>
  );
}
