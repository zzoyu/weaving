"use client";

import { ButtonAddCharacter } from "@/app/components/button-add-character";
import InputHashtag from "@/app/components/input-hashtag";
import ListProperties from "@/app/components/properties/list-properties";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Character, EPropertyType, Property } from "@/types/character";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createUniverse } from "../actions";
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
  const [characterUniverses, setCharacterUniverses] = useState<
    { character_id: number }[]
  >([]);

  const previewHashtags = useMemo(() => {
    if (!hashtags) return [];
    return hashtags
      .trim()
      .split(" ")
      .map((tag) => tag.trim());
  }, [hashtags]);

  const handleAddCharacter = (characterId: number) => {
    setCharacterUniverses((prev) => [
      ...prev,
      { character_id: Number(characterId) },
    ]);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // 기존 formData를 새로 생성하여 중복 방지
      const form = event.currentTarget;
      const formData = new FormData();

      // 기본 필드 추가
      formData.append("profile_id", profileId.toString());
      const nameInput = form.querySelector(
        'input[name="name"]'
      ) as HTMLInputElement;
      const descriptionInput = form.querySelector(
        'input[name="description"]'
      ) as HTMLInputElement;
      formData.append("name", nameInput?.value || "");
      formData.append("description", descriptionInput?.value || "");

      // 이미지 관련 필드는 UploadImage 컴포넌트에서 자동으로 추가됨
      const imageFile = form["universe-image"] as HTMLInputElement;
      const thumbnailFile = form["universe-thumbnail"] as HTMLInputElement;

      console.log(imageFile);
      console.log(thumbnailFile);

      if (imageFile?.files?.[0]) {
        formData.append("universe-image", imageFile.files[0]);
      }
      if (thumbnailFile?.files?.[0]) {
        formData.append("universe-thumbnail", thumbnailFile.files[0]);
      }

      // JSON 데이터 추가
      formData.append("list_properties", JSON.stringify(listProperties));
      formData.append(
        "universes_characters",
        JSON.stringify(characterUniverses)
      );
      formData.append("hashtags", hashtags);

      const res = await createUniverse(formData);
      if (res && res.success) {
        toast({
          description: "세계관이 저장되었습니다.",
          variant: "default",
        });
        router.push(`/u/${slug}/v`);
        router.refresh();
      } else {
        toast({
          description: res?.message || "세계관 저장에 실패했습니다.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating universe:", error);
      toast({
        description:
          error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center w-full md:max-w-md p-4"
    >
      <div className="flex flex-col gap-2 w-full justify-center items-center mt-6">
        <UploadImage name="universe" useThumbnail aspectRatio={16 / 9} />
      </div>

      <div className="flex flex-col gap-2 w-full justify-center items-center mt-6">
        <input
          className="text-2xl w-full max-w-72 text-center border-primary focus:outline-none placeholder:text-gray-400 placeholder:text-base"
          type="text"
          name="name"
          placeholder="이름"
          required
        />
        <input
          type="text"
          name="description"
          className="text-xl w-full max-w-72 text-center border-primary focus:outline-none mb-4 placeholder:text-gray-400 placeholder:text-sm"
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
            <div className="text-muted-foreground text-sm text-center py-4">
              아직 추가된 캐릭터가 없습니다.
            </div>
          )}
          {characterUniverses.map((cu) => {
            const character = characters.find(
              (c) => Number(c.id) === Number(cu.character_id)
            );
            return (
              <div
                key={cu.character_id}
                className="flex items-center justify-between p-2 bg-background-muted rounded"
              >
                <span>
                  {character ? character.name : `ID: ${cu.character_id}`}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => {
                    setCharacterUniverses(
                      characterUniverses.filter(
                        (c) => c.character_id !== cu.character_id
                      )
                    );
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
        {isSubmitting ? "저장 중..." : "저장하기"}
      </Button>
    </form>
  );
}
