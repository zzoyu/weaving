"use client";

import DeleteIcon from "@/public/assets/icons/delete.svg";
import { Property } from "@/types/character";

export default function ListPropertiesItem({
  property,
  onChange,
  onDelete,
}: {
  property: Property;
  onChange: (property: Property) => void;
  onDelete: (property: Property) => void;
}) {
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
        <input
          type="text"
          className="w-full text-center p-1 border-background-muted focus:outline-none"
          value={property.value}
          onChange={(event) => {
            onChange({ ...property, value: event.target.value });
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
        <DeleteIcon className=" text-background-dark" width={28} height={28} />
      </button>
    </div>
  );
} 