"use client";

import UploadImage from "@/app/(with-ui)/u/[slug]/v/add/components/upload-image/upload-image";
import { ButtonAddCharacter } from "@/app/components/button-add-character";
import InputHashtag from "@/app/components/input-hashtag";
import ListProperties from "@/app/components/properties/list-properties";
import OverlayLoading from "@/components/overlay-loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Character,
  CharacterWithProfile,
  EPropertyType,
  Property,
} from "@/types/character";
import { Plan } from "@/types/plan";
import { Universe } from "@/types/universe";
import { getPublicUrl } from "@/utils/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface UniverseFormProps {
  mode: "create" | "edit";
  universe?: Universe;
  characters: Character[] | CharacterWithProfile[];
  plan: Plan;
  slug?: string;
  initialCharacters?: CharacterWithProfile[];
  profileId?: number;
  onSubmit: (data: any) => Promise<void>;
}

const defaultProperties: Property[] = [
  {
    key: "장르",
    value: "",
    type: EPropertyType.STRING,
    uuid: crypto.randomUUID(),
  },
  {
    key: "사회구조",
    value: "",
    type: EPropertyType.STRING,
    uuid: crypto.randomUUID(),
  },
  {
    key: "주요 사건",
    value: "",
    type: EPropertyType.STRING,
    uuid: crypto.randomUUID(),
  },
  {
    key: "규칙",
    value: "",
    type: EPropertyType.STRING,
    uuid: crypto.randomUUID(),
  },
];

export default function UniverseForm({
  mode,
  universe,
  initialCharacters,
  characters,
  plan,
  slug,
  profileId,
  onSubmit,
}: UniverseFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hashtags, setHashtags] = useState<string>(
    mode === "edit" ? universe?.hashtags || "" : ""
  );
  const [currentHashtag, setCurrentHashtag] = useState<string>("");
  const [listProperties, setListProperties] = useState<Property[]>(
    mode === "edit"
      ? universe?.properties?.map((p) => ({
          ...p,
          uuid: crypto.randomUUID(),
        })) || []
      : defaultProperties
  );
  const [characterUniverses, setCharacterUniverses] = useState<
    { character_id: number }[]
  >(mode === "edit" && initialCharacters ? initialCharacters.map((c) => ({ character_id: c.id })) : []);

  const previewHashtags = useMemo(() => {
    if (!hashtags) return [];
    return hashtags
      .trim()
      .split(" ")
      .map((tag) => tag.trim());
  }, [hashtags]);

  const handleAddCharacter = (
    characterIds: {
      character_id: number;
    }[]
  ) => {
    setCharacterUniverses(() => [...characterIds]);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;

      if (mode === "create") {
        // 새로 생성하는 경우 FormData 사용
        const formData = new FormData();

        // 기본 필드 추가
        if (profileId) {
          formData.append("profile_id", profileId.toString());
        }
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

        await onSubmit(formData);
      } else {
        // 수정하는 경우 객체 데이터 사용
        const formData = {
          ...universe,
          name:
            (form.querySelector('input[name="name"]') as HTMLInputElement)
              ?.value || "",
          description:
            (
              form.querySelector(
                'input[name="description"]'
              ) as HTMLInputElement
            )?.value || "",
          properties: listProperties,
          hashtags: hashtags,
          characterUniverses: characterUniverses,
        };

        await onSubmit(formData);
      }

      toast({
        description:
          mode === "create"
            ? "세계관이 저장되었습니다."
            : "세계관이 수정되었습니다.",
      });

      if (mode === "create" && slug) {
        router.push(`/u/${slug}/v`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error submitting universe:", error);
      toast({
        description:
          error instanceof Error ? error.message : "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (mode === "create") {
      window.scrollTo(0, 0);
    }
  }, [mode]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center w-full lg:max-w-md p-4"
    >
      <div className="flex flex-col gap-2 w-full justify-center items-center mt-6">
        <UploadImage
          name="universe"
          useThumbnail
          aspectRatio={16 / 9}
          imageUrl={
            mode === "edit" ? getPublicUrl(universe?.image?.[0]) : undefined
          }
        />
      </div>

      <div className="flex flex-col gap-2 w-full justify-center items-center mt-6">
        <input
          className={`text-2xl w-full max-w-72 text-center border-primary focus:outline-none ${
            mode === "create"
              ? "placeholder:text-gray-400 placeholder:text-base"
              : ""
          }`}
          type="text"
          name="name"
          placeholder="이름"
          defaultValue={mode === "edit" ? universe?.name : ""}
          required
        />
        <input
          type="text"
          name="description"
          className={`text-xl w-full max-w-72 text-center border-primary focus:outline-none mb-4 ${
            mode === "create"
              ? "placeholder:text-gray-400 placeholder:text-sm"
              : ""
          }`}
          placeholder="세계관에 대한 설명"
          defaultValue={mode === "edit" ? universe?.description || "" : ""}
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
                className="temporarily-added-character-item"
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
            characters={characters}
            currentUniverses={characterUniverses}
            onAdd={handleAddCharacter}
            maxSelectableCharacters={plan.limit.maxCharactersInUniverse}
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="text-background-default bg-text-black rounded w-full text-xl p-2"
      >
        저장하기
      </button>
      {isSubmitting ? (
        <OverlayLoading message="세계관을 저장 중입니다..." />
      ) : null}
    </form>
  );
}
