import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Property } from "@/types/character";
import { EditorContent, useEditor, UseEditorOptions } from "@tiptap/react";
import StarterKit, { StarterKitOptions } from "@tiptap/starter-kit";
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      } as StarterKitOptions),
    ],
    content: property.value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "w-full min-h-4 overflow-y-auto p-2 focus-visible:outline-none focus-visible:ring-0 focus:ring-0 text-sm",
      },
    },
  } as UseEditorOptions);

  return (
    <div className="w-full relative">
      <InputGroup
        className={cn(
          "w-full border ring-1 ring-neutral-950 dark:ring-neutral-300",
          { "ring-red-500": valueError || keyError },
        )}
      >
        <EditorContent
          editor={editor}
          data-slot="input-group-control"
          className="w-full h-fit"
        />

        <InputGroupAddon align="block-end">
          <div className="flex gap-1">
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("bold") ? "opacity-50" : "opacity-100",
              )}
              size="icon-xs"
              onClick={() => editor.commands.toggleBold()}
            >
              <BoldIcon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("italic") ? "opacity-50" : "opacity-100",
              )}
              size="icon-xs"
              onClick={() => editor.commands.toggleItalic()}
            >
              <ItalicIcon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("underline") ? "opacity-50" : "opacity-100",
              )}
              size="icon-xs"
              onClick={() => editor.commands.toggleUnderline()}
            >
              <UnderlineIcon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("strike") ? "opacity-50" : "opacity-100",
              )}
              size="icon-xs"
              onClick={() => editor.commands.toggleStrike()}
            >
              <StrikethroughIcon />
            </InputGroupButton>
          </div>
          <Separator orientation="vertical" className="!h-4" />
          <div className="flex gap-1">
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("heading", { level: 1 })
                  ? "opacity-50"
                  : "opacity-100",
              )}
              size="icon-xs"
              onClick={() => editor.commands.toggleHeading({ level: 1 })}
            >
              <Heading1Icon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("heading", { level: 2 })
                  ? "opacity-50"
                  : "opacity-100",
              )}
              size="icon-xs"
              onClick={() => editor.commands.toggleHeading({ level: 2 })}
            >
              <Heading2Icon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("heading", { level: 3 })
                  ? "opacity-50"
                  : "opacity-100",
              )}
              size="icon-xs"
              onClick={() => editor.commands.toggleHeading({ level: 3 })}
            >
              <Heading3Icon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("bulletList") ? "opacity-50" : "opacity-100",
              )}
              size="icon-xs"
              onClick={() =>
                editor.commands.toggleList("bulletList", "listItem")
              }
            >
              <ListIcon />
            </InputGroupButton>
          </div>

          <InputGroupText className="ml-auto opacity-90 text-xs leading-none">
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
