"use client";

import { Property } from "@/types/character";
import { colorList } from "@/types/color";
import clsx from "clsx";
import { useState } from "react";

function ColorModal({
  isOpen,
  onClose,
}: {
  editable?: boolean;
  isOpen: boolean;
  onClose: (newValue?: string | null) => void;
}) {
  const tempColorList = [...Object.values(colorList)];
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-10 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="w-96 h-fit bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-center text-xl my-4">색상 선택</h2>
        <div className="grid place-items-center grid-flow-dense grid-cols-7 gap-2 p-4">
          {Object.entries(colorList).map(([key, color]) => (
            <button
              type="button"
              key={`color-chip-${color}`}
              className={clsx("w-10 h-10 border-gray-300 border", color)}
              onClick={() => {
                onClose(key);
              }}
            ></button>
          ))}
          <button
            type="button"
            key={`color-chip-none`}
            className="w-10 h-10 border-gray-300 border bg-transparent relative
            bg-from-white to-gray-300"
            onClick={() => {
              onClose("");
            }}
          >
            <div className="absolute w-full h-px bg-gray-300 rotate-45 top-1/2 left-0 transform -translate-y-1/2"></div>
            <div className="absolute w-full h-px bg-gray-300 -rotate-45 top-1/2 left-0 transform -translate-y-1/2"></div>
          </button>
        </div>
        <button
          type="button"
          className="w-full p-2 mt-4  bg-text-black text-background-default"
          onClick={() => onClose()}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

function ColorPicker({
  property,
  handler,
  editable = false,
}: {
  property: Property;
  handler: (property: any) => void;
  editable?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 flex justify-center items-center">
      <ColorModal
        editable={editable}
        isOpen={isOpen}
        onClose={(newValue) => {
          setIsOpen(false);
          if (newValue !== undefined) {
            handler({ ...property, value: newValue });
          }
        }}
      />
      <button
        type="button"
        className={clsx(
          "relative w-10 h-10 border-background-muted border",
          colorList?.[(property?.value as string) || "white"]
        )}
        onClick={() => {
          if (editable) setIsOpen(true);
        }}
      >
        {(!property?.value || property.value === "") && (
          <>
            <div className="absolute w-full h-px bg-gray-300 rotate-45 top-1/2 left-0 transform -translate-y-1/2"></div>
            <div className="absolute w-full h-px bg-gray-300 -rotate-45 top-1/2 left-0 transform -translate-y-1/2"></div>
          </>
        )}
      </button>
    </div>
  );
}

export function ColorProperties({
  properties,
  handler,
  editable = false,
}: {
  properties: Property[];
  handler?: (properties: Property[]) => void;
  editable?: boolean;
}) {
  return (
    <div className="w-full grid grid-cols-3">
      <div className="text-text-black bg-background-muted text-center py-1">
        테마색
      </div>
      <div className="text-text-black bg-background-muted text-center py-1">
        눈동자색
      </div>
      <div className="text-text-black bg-background-muted text-center py-1">
        머리색
      </div>

      <ColorPicker
        editable={editable}
        property={properties[0]}
        handler={(property) => {
          const newProperties = [...properties];
          newProperties[0] = property;
          handler?.(newProperties);
        }}
      />
      <ColorPicker
        editable={editable}
        property={properties[1]}
        handler={(property) => {
          const newProperties = [...properties];
          newProperties[1] = property;
          handler?.(newProperties);
        }}
      />
      <ColorPicker
        editable={editable}
        property={properties[2]}
        handler={(property) => {
          const newProperties = [...properties];
          newProperties[2] = property;
          handler?.(newProperties);
        }}
      />
    </div>
  );
}
