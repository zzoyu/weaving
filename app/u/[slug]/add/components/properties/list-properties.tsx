import { Property } from "@/types/character";
import ListPropertiesItem from "./list-properties-item";

export default function ListProperties({
  properties,
  handler,
}: {
  properties: Property[];
  handler: (properties: Property[]) => void;
}) {
  return (
    <div className="flex flex-col gap-2 p-1 rounded border">
      {properties.map((property, index) => (
        <ListPropertiesItem
          key={index}
          property={property}
          onChange={(property) => {
            const newProperties = [...properties];
            newProperties[index] = property;
            handler(newProperties);
          }}
        />
      ))}
    </div>
  );
}
