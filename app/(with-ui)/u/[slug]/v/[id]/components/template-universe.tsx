import { CharacterWithProfile } from "@/types/character";
import { Universe } from "@/types/universe";
import { getPublicUrl } from "@/utils/image";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { CharacterProfileField } from "../../../[id]/components/profile-card";
import { ListCharacter } from "./character-list";

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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 pb-20 bg-white dark:bg-neutral-900">
      {/* 상단 이미지 */}
      <div className="w-48 h-48 relative flex items-center justify-center mt-8 mb-2">
        {universe.image && universe.image.length > 0 ? (
          <Image
            unoptimized
            src={getPublicUrl(universe.image[0]) || ""}
            alt={universe.name}
            fill
            className="object-contain bg-gray-50"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
            <ImageIcon className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* 이름, 설명, 수정/관계도 버튼 */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-center">{universe.name}</h1>
        </div>
        {universe.description && (
          <p className="text-base text-muted-foreground text-center mb-2">
            {universe.description}
          </p>
        )}
      </div>

      {/* 속성 카드 리스트 */}
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <div className="text-gray-700 w-full px-10">
          {universe.properties && universe.properties.length > 0 && (
            <div className="w-full max-w-md flex flex-col gap-3 mt-2">
              {universe.properties.map((property, idx) => (
                <CharacterProfileField
                  key={`property-${idx}`}
                  property={property}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 캐릭터 리스트 */}
      <div className="w-full px-0 mt-2">
        <ListCharacter characters={characters} isMine={isMyProfile} />
      </div>

      {/* 해시태그 */}
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {hashtags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
