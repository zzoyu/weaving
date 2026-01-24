import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Property } from "@/types/character";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, UseEditorOptions } from "@tiptap/react";
import StarterKit, { StarterKitOptions } from "@tiptap/starter-kit";
import {
  BoldIcon,
  CircleAlert,
  Heading1Icon,
  Heading2Icon,
  ItalicIcon,
  ListIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

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
  const [localPropertyValue, setLocalPropertyValue] = useState(
    property.value || "",
  );
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
      } as StarterKitOptions),
      Underline,
    ],
    content: property.value || "",

    immediatelyRender: true,
    editorProps: {
      attributes: {
        class:
          "w-full min-h-4 overflow-y-auto p-2 focus-visible:outline-none focus-visible:ring-0 focus:ring-0 text-sm bg-transparent",
      },
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange({ ...property, value: html });
      setLocalPropertyValue(html);
    },
  } as UseEditorOptions);

  const currentLength = useMemo(
    () => editor.getText().length || 0,
    [localPropertyValue],
  );

  return (
    <div className="w-full relative">
      <InputGroup
        className={cn(
          "w-full border ring-1 ring-neutral-950 dark:ring-neutral-300 dark:bg-neutral-900 bg-white",
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
                editor?.isActive?.("bold") &&
                  "bg-neutral-100 dark:bg-neutral-800",
              )}
              size="icon-xs"
              onClick={() => editor?.commands.toggleBold()}
              aria-label="굵게"
              aria-pressed={editor?.isActive?.("bold") ?? false}
            >
              <BoldIcon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("italic") &&
                  "bg-neutral-100 dark:bg-neutral-800",
              )}
              size="icon-xs"
              onClick={() => editor?.commands.toggleItalic()}
              aria-label="기울임"
              aria-pressed={editor?.isActive?.("italic") ?? false}
            >
              <ItalicIcon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("underline") &&
                  "bg-neutral-100 dark:bg-neutral-800",
              )}
              size="icon-xs"
              onClick={() => editor?.commands.toggleUnderline()}
              aria-label="밑줄"
              aria-pressed={editor?.isActive?.("underline") ?? false}
            >
              <UnderlineIcon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("strike") &&
                  "bg-neutral-100 dark:bg-neutral-800",
              )}
              size="icon-xs"
              onClick={() => editor?.commands.toggleStrike()}
              aria-label="취소선"
              aria-pressed={editor?.isActive?.("strike") ?? false}
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
                editor?.isActive?.("heading", { level: 1 }) &&
                  "bg-neutral-100 dark:bg-neutral-800",
              )}
              size="icon-xs"
              onClick={() => editor?.commands.toggleHeading({ level: 1 })}
              aria-label="제목 1"
              aria-pressed={
                editor?.isActive?.("heading", { level: 1 }) ?? false
              }
            >
              <Heading1Icon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("heading", { level: 2 }) &&
                  "bg-neutral-100 dark:bg-neutral-800",
              )}
              size="icon-xs"
              onClick={() => editor?.commands.toggleHeading({ level: 2 })}
              aria-label="제목 2"
              aria-pressed={
                editor?.isActive?.("heading", { level: 2 }) ?? false
              }
            >
              <Heading2Icon />
            </InputGroupButton>
            <InputGroupButton
              variant="outline"
              className={cn(
                "rounded-sm",
                editor?.isActive?.("bulletList") &&
                  "bg-neutral-100 dark:bg-neutral-800",
              )}
              size="icon-xs"
              onClick={() =>
                editor?.commands.toggleList("bulletList", "listItem")
              }
              aria-label="글머리 기호"
              aria-pressed={editor?.isActive?.("bulletList") ?? false}
            >
              <ListIcon />
            </InputGroupButton>
          </div>

          <InputGroupText className="ml-auto opacity-90 text-xs leading-none">
            {currentLength}/{limit ?? "∞"}
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
