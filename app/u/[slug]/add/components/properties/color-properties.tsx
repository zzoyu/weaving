import { Property } from "@/types/character";

export function ColorProperties({
  properties,
  handler,
}: {
  properties: Property[];
  handler: (properties: Property[]) => void;
}) {
  return (
    <div>
      <h1>ColorProperties</h1>
    </div>
  );
}
