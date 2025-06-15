import { Universe } from "@/types/universe";
import ListUniverseItem from "./list-universe-item";

interface ListUniverseProps {
  universes: Universe[];
  slug: string;
  isMine?: boolean;
  profileId?: number;
}

export default function ListUniverse({
  universes,
  slug,
  isMine = false,
}: ListUniverseProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
        {universes.map((universe) => (
          <div key={`universe-${universe.id}`} className="w-full">
            <ListUniverseItem
              universe={universe}
              slug={slug}
              isMine={isMine}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 