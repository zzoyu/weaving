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
  const hashtags = characterData.hashtags
    ? characterData.hashtags.split(" ")
    : [];
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

      <hr className="mt-10 p-0 w-full" />

      <ColorProperties properties={colorProperties} />

      <hr className="mt-0 p-0 w-full" />

      {relationships && (
        <>
          <RelationshipCard
            character={characterData}
            relationships={relationships}
            isMine={isMyProfile}
          />
          <hr className="mt-0 p-0 w-full" />
        </>
      )}

      {hashtags && (
        <div className=" inline-flex flex-wrap gap-2">
          {hashtags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full px-8 py-1 bg-primary-100 border border-primary-300 relative"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
