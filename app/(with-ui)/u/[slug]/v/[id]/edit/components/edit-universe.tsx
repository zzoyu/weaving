"use client";

import { ButtonAddCharacter } from "@/app/components/button-add-character";
import InputHashtag from "@/app/components/input-hashtag";
import ListProperties from "@/app/components/properties/list-properties";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CharacterWithProfile, Property } from "@/types/character";
import { Plan } from "@/types/plan";
import { Universe } from "@/types/universe";
import { getPublicUrl } from "@/utils/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import UploadImage from "../../../add/components/upload-image/upload-image";

interface EditUniverseProps {
  universe: Universe;
  characters: CharacterWithProfile[];
  onSubmit: (data: Universe) => Promise<void>;
  plan: Plan;
}

export default function EditUniverse({
  universe,
  characters,
  onSubmit,
  plan,
}: EditUniverseProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hashtags, setHashtags] = useState<string>(universe.hashtags || "");
  const [currentHashtag, setCurrentHashtag] = useState<string>("");
  const [listProperties, setListProperties] = useState<Property[]>(
    universe.properties || []
  );
  const [characterUniverses, setCharacterUniverses] = useState<
    { character_id: number }[]
  >(characters.map((c) => ({ character_id: c.id })));

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
      const formData = {
        ...universe,
        name:
          (form.querySelector('input[name="name"]') as HTMLInputElement)
            ?.value || "",
        description:
          (form.querySelector('input[name="description"]') as HTMLInputElement)
            ?.value || "",
        properties: listProperties,
        hashtags: hashtags,
        characterUniverses: characterUniverses,
      };

      await onSubmit(formData);
      toast({
        description: "세계관이 수정되었습니다.",
      });
    } catch (error) {
      console.error("Error updating universe:", error);
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
        <UploadImage
          name="universe"
          useThumbnail
          aspectRatio={16 / 9}
          imageUrl={getPublicUrl(universe.image?.[0])}
        />
      </div>

      <div className="flex flex-col gap-2 w-full justify-center items-center mt-6">
        <input
          className="text-2xl w-full max-w-72 text-center border-primary focus:outline-none"
          type="text"
          name="name"
          placeholder="이름"
          defaultValue={universe.name}
          required
        />
        <input
          type="text"
          name="description"
          className="text-xl w-full max-w-72 text-center border-primary focus:outline-none mb-4"
          placeholder="세계관에 대한 설명"
          defaultValue={universe.description || ""}
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

      <Button
        type="submit"
        variant="outline"
        disabled={isSubmitting}
        className="text-background-default bg-text-black rounded w-full text-xl p-2"
      >
        저장하기
      </Button>
    </form>
  );
}
