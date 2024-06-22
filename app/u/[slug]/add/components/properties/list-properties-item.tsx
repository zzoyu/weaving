"use client";

import { Property } from "@/types/character";
import { useState } from "react";

export default function ListPropertiesItem({
  property,
  onChange,
}: {
  property: Property;
  onChange: (property: Property) => void;
}) {
  const [key, setKey] = useState(property.key);
  const [value, setValue] = useState(property.value);

  return (
    <div className="flex gap-2">
      <input
        className="w-20"
        type="text"
        value={key}
        onChange={(event) => {
          setKey(event.target.value);
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          onChange({ ...property, key, value: event.target.value });
        }}
      />
    </div>
  );
}
