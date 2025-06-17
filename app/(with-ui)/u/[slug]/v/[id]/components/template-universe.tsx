import { CharacterWithProfile } from "@/types/character";
import { Universe } from "@/types/universe";
import { ListUniverseCharacter } from "./list-universe-character";
import { UniverseCard } from "./universe-card";

interface UniverseTemplateProps {
  universe: Universe;
  characters: CharacterWithProfile[];
  isMyProfile: boolean;
  slug: string;
}

export default function TemplateUniverse({
  universe,
  characters,
  isMyProfile,
  slug,
}: UniverseTemplateProps) {
  const hashtags = universe.hashtags
    ? universe.hashtags.split(" ").filter(Boolean)
    : [];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 pb-20">
      <UniverseCard
        universe={universe}
        characters={characters}
        isMine={isMyProfile}
      />

      {/* 관계 인물(캐릭터) */}
      <div className="w-full mt-6 px-4">
        <h2 className="text-lg font-semibold mb-4">소속 캐릭터</h2>
        {characters.length === 0 ? (
          <span className="text-gray-400 col-span-3 text-center">
            소속 캐릭터가 없습니다.
          </span>
        ) : (
          <ListUniverseCharacter characters={characters} />
        )}
      </div>

      {/* 해시태그 */}
      {hashtags && (
        <div className="inline-flex flex-wrap gap-2 px-10 place-self-start">
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
