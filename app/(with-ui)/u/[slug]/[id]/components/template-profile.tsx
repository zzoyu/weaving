import { ColorProperties } from "@/app/components/properties/color-properties";
import StatsChart from "@/app/components/properties/stats-chart";
import { Character, Property } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { generateId } from "@/utils/random-character/common";
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
    ? characterData.hashtags.split(" ").filter((tag) => tag.trim() !== "")
    : [];

  const stats =
    characterData.properties
      ?.filter((property) => property.type === "stat")
      .filter((property) => property.key?.trim?.())
      .map((stat) => ({
        id: stat.uuid || stat.key || generateId(),
        name: stat.key,
        value: parseInt(stat.value) || 0,
        fullMark: 10,
      })) || [];

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

      <div className="w-full px-10 content-visibility-auto">
        <ColorProperties properties={colorProperties} />
      </div>

      {stats && (
        <div className="content-visibility-auto">
          <StatsChart data={stats} />
        </div>
      )}

      {relationships && relationships.length > 0 && (
        <div className="content-visibility-auto">
          <RelationshipCard
            character={characterData}
            relationships={relationships}
          />
        </div>
      )}

      {hashtags && hashtags.length > 0 && (
        <div className="inline-flex flex-wrap gap-2 px-10 content-visibility-auto">
          {hashtags.map((tag, index) => (
            <span key={`hashtag-${index}-${tag}`} className="item-hashtag">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
