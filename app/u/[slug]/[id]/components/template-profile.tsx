import { Character, Property } from "@/types/character";
import { ColorProperties } from "../../add/components/properties/color-properties";
import ButtonAddRelationship from "./button-add-relationship";
import { ProfileCard } from "./profile-card";
import { RelationshipCard } from "./relationship-card";
import { Relationship } from "@/types/relationship";

export default function TemplateProfile({
  characterData,
  relationships,
  colorProperties,
  isMyProfile,
  slug,
  id,
}: {
  characterData: Character;
  relationships: Relationship[];
  colorProperties: Property[];
  isMyProfile: boolean;
  slug: string;
  id: string;
}) {
  return (
    <div className="w-full p-4 md:max-w-[40rem] mx-auto flex flex-col gap-8">
      {isMyProfile && (
        <div className="flex items-center justify-end">
          {/* favorite icon */}
          {/* lock icon */}
        </div>
      )}
      <ProfileCard
        character={characterData}
        relationships={relationships || []}
        isMine={isMyProfile}
      />

      {isMyProfile && (
        <ButtonAddRelationship
          character={characterData}
          relationships={relationships || []}
          currentPath={`/u/${slug}/${id}`}
        />
      )}

      <hr className="mt-10 p-0 w-full" />

      <ColorProperties properties={colorProperties} />

      <hr className="mt-0 p-0 w-full" />

      {relationships && (
        <RelationshipCard
          character={characterData}
          relationships={relationships}
          isMine={isMyProfile}
        />
      )}
    </div>
  );
}
