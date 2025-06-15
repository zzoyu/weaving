"use client";

import { ButtonAddCharacter } from "@/app/components/button-add-character";
import InputHashtag from "@/app/components/input-hashtag";
import ListProperties from "@/app/components/properties/list-properties";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Character, EPropertyType, Property } from "@/types/character";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CharacterUniverse } from "../../../../../../../types/character-universe";
import { createUniverseAction } from "../actions";
import UploadImage from "./upload-image/upload-image";

interface UniverseAddTemplateProps {
  slug: string;
  profileId: number;
  characters: Character[];
}

export default function UniverseAddTemplate({
  slug,
  profileId,
  characters,
}: UniverseAddTemplateProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hashtags, setHashtags] = useState<string>("");
  const [currentHashtag, setCurrentHashtag] = useState<string>("");
  const [listProperties, setListProperties] = useState<Property[]>([
    { key: "장르", value: "", type: EPropertyType.STRING },
    { key: "사회구조", value: "", type: EPropertyType.STRING },
    { key: "주요 사건", value: "", type: EPropertyType.STRING },
    { key: "규칙", value: "", type: EPropertyType.STRING },
  ]);
  const [characterUniverses, setCharacterUniverses] = useState<CharacterUniverse[]>([]);

  const previewHashtags = useMemo(() => {
    if (!hashtags) return [];
    return hashtags
      .trim()
      .split(" ")
      .map((tag) => tag.trim());
  }, [hashtags]);

  const handleAddCharacter = (characterId: number) => {
    setCharacterUniverses(prev => [
      ...prev,
      {
        character_id: Number(characterId),
        universe_id: 0, // 임시값, 서버에서 실제 universe_id로 업데이트
        created_at: new Date().toISOString(),
        id: 0, // 임시값, 서버에서 실제 id로 업데이트
      },
    ]);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("profile_id", profileId.toString());
      formData.append("hashtags", hashtags);
      formData.append("list_properties", JSON.stringify(listProperties));
      formData.append("character_universes", JSON.stringify(characterUniverses));

      await createUniverseAction(formData);

      toast({
        description: "유니버스가 생성되었습니다.",
      });

      router.push(`/u/${slug}/v`);
      router.refresh();
    } catch (error) {
      console.error("Error creating universe:", error);
      toast({
        description: error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full md:max-w-md p-4">
      <div className="flex flex-col gap-2 w-full justify-center items-center mt-6">
        <UploadImage name="universe" useThumbnail aspectRatio={16/9} />
      </div>

      <div className="flex flex-col gap-2 w-full justify-center items-center mt-6">
        <input
          className="text-2xl w-full max-w-72 text-center border-primary focus:outline-none"
          type="text"
          name="name"
          placeholder="이름"
          required
        />
        <input
          type="text"
          name="description"
          className="text-xl w-full max-w-72 text-center border-primary focus:outline-none mb-4"
          placeholder="세계관에 대한 설명"
        />
      </div>

      <div className="w-full px-4">
        <h2 className="text-xl font-bold mb-2">속성</h2>
        <ListProperties
          properties={listProperties}
          handler={setListProperties}
        />
      </div>

      <div className="w-full px-4">
        <h2 className="text-xl font-bold mb-2">소속 캐릭터</h2>
        <div className="flex flex-col gap-2">
          {characterUniverses.length === 0 && (
            <div className="text-muted-foreground text-sm text-center py-4">아직 추가된 캐릭터가 없습니다.</div>
          )}
          {characterUniverses.map((cu) => {
            const character = characters.find((c) => Number(c.id) === Number(cu.character_id));
            return (
              <div key={cu.character_id} className="flex items-center justify-between p-2 bg-background-muted rounded">
                <span>{character ? character.name : `ID: ${cu.character_id}`}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => {
                    setCharacterUniverses(characterUniverses.filter((c) => c.character_id !== cu.character_id));
                  }}
                >
                  ✕
                </Button>
              </div>
            );
          })}
          <ButtonAddCharacter
            characters={characters.filter(
              (c) => !characterUniverses.some((cu) => cu.character_id === c.id)
            )}
            onAdd={handleAddCharacter}
          />
        </div>
      </div>

      <div className="w-full px-4">
        <InputHashtag
          value={currentHashtag}
          hashtags={previewHashtags}
          onChange={(newValue: string) => {
            if (newValue[newValue.length - 1] === " ") {
              setHashtags(hashtags + newValue);
              setCurrentHashtag("");
            } else setCurrentHashtag(newValue);
          }}
          onDelete={(index: number) => {
            setHashtags(
              hashtags
                .trim()
                .split(" ")
                .filter((_, i) => i !== index)
                .join(" ")
            );
          }}
        />
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="text-background-default bg-text-black rounded w-full text-xl p-2"
      >
        {isSubmitting ? "생성 중..." : "유니버스 생성"}
      </Button>
    </form>
  );
}
