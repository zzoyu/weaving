import { CharacterWithProfile } from "@/types/character";
import { Universe } from "@/types/universe";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 pb-20 bg-white">
      {/* 상단 이미지 */}
      <div className="w-48 h-48 relative flex items-center justify-center mt-8 mb-2">
        {universe.image && universe.image.length > 0 ? (
          <Image
            unoptimized
            src={universe.image[0]}
            alt={universe.name}
            fill
            className="object-contain rounded-xl border border-gray-200 bg-gray-50"
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
          <h1 className="text-2xl font-bold text-center" style={{ fontFamily: 'Pretendard, sans-serif' }}>{universe.name}</h1>
        </div>
        {universe.description && (
          <p className="text-base text-muted-foreground text-center mb-2">{universe.description}</p>
        )}
      </div>

      {/* 속성 카드 리스트 */}
      {universe.properties && universe.properties.length > 0 && (
        <div className="w-full max-w-md flex flex-col gap-3 mt-2">
          {universe.properties.map((property, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 shadow-sm"
            >
              <span className="font-semibold text-gray-600 text-base">{property.key}</span>
              <span className="text-gray-900 text-base font-medium break-all text-right">{property.value}</span>
            </div>
          ))}
        </div>
      )}

          {/* 관계 인물(캐릭터) */}
          <div className="w-full mt-6 px-4">
            <h2 className="text-lg font-semibold mb-4">소속 캐릭터</h2>
            <div className="grid grid-cols-3 min-w-[300px] gap-2">
              {characters && characters.length > 0 ? (
                characters.map((character, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-100 border border-gray-200 mb-1">
                      {character.image && character.image.length > 0 ? (
                        <Image
                          unoptimized
                          src={character.image[0]}
                          alt={character.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-muted-foreground absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>
                    <span className="text-xs text-center line-clamp-1">{character.name}</span>
                  </div>
                ))
              ) : (
                <span className="text-gray-400 col-span-3 text-center">관계 인물이 없습니다.</span>
              )}
            </div>
          </div>

      {/* 해시태그 */}
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {hashtags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-xs font-medium">#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
