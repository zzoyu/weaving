"use client";

import { Property } from "@/types/character";
import { useState } from "react";

import DeleteIcon from "@/public/assets/icons/delete.svg";

export default function ListPropertiesItem({
  property,
  onChange,
  onDelete,
}: {
  property: Property;
  onChange: (property: Property) => void;
  onDelete: (property: Property) => void;
}) {
  const [key, setKey] = useState(property.key);
  const [value, setValue] = useState(property.value);

  return (
    <div className="w-full h-fit relative flex items-center justify-center group">
      <div className="w-full flex gap-4">
        <input type="hidden" name="list-properties" value={`${key}:${value}`} />
        <input
          className="w-1/3 text-center p-1  border-primary-100 focus:outline-none"
          type="text"
          value={key}
          onChange={(event) => {
            setKey(event.target.value);
          }}
        />
        <input
          type="text"
          className="w-full text-center p-1 border-primary-100 focus:outline-none"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            onChange({ ...property, key, value: event.target.value });
          }}
        />
      </div>
      <button
        className="absolute right-0 visible md:invisible md:group-hover:visible"
        type="button"
        onClick={() => {
          onDelete(property);
        }}
      >
        <DeleteIcon className="text-primary-200" width={28} height={28} />
      </button>
    </div>
  );
}
