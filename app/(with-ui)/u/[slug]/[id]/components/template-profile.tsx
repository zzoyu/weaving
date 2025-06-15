import { ColorProperties } from "@/app/components/properties/color-properties";
import { Character, Property } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { ProfileCard } from "./profile-card";
import { RelationshipCard } from "./relationship-card";

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
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pb-20">
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

      <div className="w-full px-10">
        <ColorProperties properties={colorProperties} />
      </div>

      {relationships && (
        <>
          <RelationshipCard
            character={characterData}
            relationships={relationships}
            isMine={isMyProfile}
          />
        </>
      )}

      {hashtags && (
        <div className="inline-flex flex-wrap gap-2 px-10">
          {hashtags.map((tag, index) => (
            <span key={index} className="item-hashtag">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
