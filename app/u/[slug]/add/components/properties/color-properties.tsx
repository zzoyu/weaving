"use client";

import { Property } from "@/types/character";
import { useState } from "react";
import { colorList } from "@/types/color";
import clsx from "clsx";

function ColorModal({
  isOpen,
  onClose,
}: {
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
          {Object.values(colorList).map((color) => (
            <button
              type="button"
              key={`color-chip-${color}`}
              className={clsx("w-10 h-10 border-gray-300 border", color)}
              onClick={() => {
                onClose(color);
              }}
            ></button>
          ))}
          {/* add x lines for transparent color, with tailwindcss */}
          <button
            type="button"
            key={`color-chip-none`}
            className="w-10 h-10 border-gray-300 border bg-transparent relative
            bg- from-white to-gray-300"
            onClick={() => {
              onClose(null);
            }}
          >
            <div className="absolute w-full h-px bg-gray-300 rotate-45 top-1/2 left-0 transform -translate-y-1/2"></div>
            <div className="absolute w-full h-px bg-gray-300 -rotate-45 top-1/2 left-0 transform -translate-y-1/2"></div>
          </button>
        </div>
        <button
          type="button"
          className="w-full p-2 mt-4 bg-primary-200 text-white"
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
}: {
  property: Property;
  handler: (property: Property) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 flex justify-center items-center">
      <ColorModal
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
        className="w-10 h-10 bg-white border-primary-100 border"
        onClick={() => {
          setIsOpen(true);
        }}
      ></button>
    </div>
  );
}

export function ColorProperties({
  properties,
  handler,
}: {
  properties: Property[];
  handler: (properties: Property[]) => void;
}) {
  return (
    <div className="w-full grid grid-cols-3">
      <div className="bg-primary-100 text-center py-1">테마색</div>
      <div className="bg-primary-100 text-center py-1">눈동자색</div>
      <div className="bg-primary-100 text-center py-1">머리색</div>

      <ColorPicker
        property={properties[0]}
        handler={(property) => {
          const newProperties = [...properties];
          newProperties[0] = property;
          handler(newProperties);
        }}
      />
      <ColorPicker
        property={properties[1]}
        handler={(property) => {
          const newProperties = [...properties];
          newProperties[1] = property;
          handler(newProperties);
        }}
      />
      <ColorPicker
        property={properties[2]}
        handler={(property) => {
          const newProperties = [...properties];
          newProperties[2] = property;
          handler(newProperties);
        }}
      />
    </div>
  );
}
