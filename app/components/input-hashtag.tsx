"use client";

import { CircleAlert } from "lucide-react";
import { FieldError } from "react-hook-form";

export default function InputHashtag({
  value,
  onChange,
  onDelete,
  hashtags,
  error,
}: {
  hashtags: string[];
  value: string;
  onChange: (value: string) => void;
  onDelete: (index: number) => void;
  error?: FieldError;
}) {
  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <h2 className="text-lg font-bold">해시태그</h2>
      <div className="w-full relative flex items-center">
        <input type="hidden" name="hashtags" value={hashtags.join(" ")} />
        <span className="absolute ml-2 font-bold text-primary-200">#</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChange(value + " ");
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          placeholder="해시태그 입력"
          className={
            "w-full text-xl border-background-muted focus:outline-none pl-6 py-1 dark:bg-neutral-900 dark:text-gray-100 placeholder:text-gray-400 placeholder:text-sm" +
            (error ? " border-state-error" : "")
          }
        />
      </div>
      <div className="inline-flex flex-wrap gap-2 min-h-4">
        {hashtags.map((hashtag, index) => (
          <span className="item-hashtag" key={`hashtag-${index}-${hashtag}`}>
            #{hashtag}
            <button
              type="button"
              className="absolute right-2 text-primary-300"
              onClick={(e) => {
                onDelete?.(index);
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              ✕
            </button>
          </span>
        ))}
        {error && (
          <span className="text-red-500 text-sm flex items-center gap-1">
            <CircleAlert className="inline w-4 h-4" />
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
}
