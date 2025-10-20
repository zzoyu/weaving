"use client";

import { ColorProperties } from "@/app/components/properties/color-properties";
import OverlayLoading from "@/components/overlay-loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { baseProperties } from "@/lib/base-properties";
import { Character, Property } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { Suspense, useMemo, useState } from "react";
import { updateCharacter } from "../../../add/actions";
import { ButtonAddRelationship } from "../../../add/components/button-add-relationship";
import UploadImage from "../../../add/components/upload-image/upload-image";
import Loading from "../../loading";

import InputHashtag from "@/app/components/input-hashtag";
import ListProperties from "@/app/components/properties/list-properties";
import { useToast } from "@/hooks/use-toast";
import IconFull from "@/public/assets/icons/image/full.svg";
import IconHalf from "@/public/assets/icons/image/half.svg";
import { getPublicUrl } from "@/utils/image";
import { useRouter } from "next/navigation";

export default function CharacterEditTemplate({
  character,
  relationships,
  colors,
}: {
  character: Character;
  colors: Property[];
  relationships?: Relationship[];
}) {
  const [properties, setProperties] = useState(
    character?.properties.map((p) => ({ ...p, uuid: crypto.randomUUID() })) ||
      [...baseProperties].map((p) => ({ ...p, uuid: crypto.randomUUID() }))
  );
  const [hashtags, setHashtags] = useState<string>(
    character.hashtags?.length || 0 > 0 ? character.hashtags + " " : ""
  );
  const [currentHashtag, setCurrentHashtag] = useState<string>("");
  const previewHashtags = useMemo(() => {
    if (!hashtags) return [];
    return hashtags
      .trim()
      .split(" ")
      .map((tag) => tag.trim());
  }, [hashtags]);

  const [currentColors, setCurrentColors] = useState<Property[]>(colors);

  const [relationshipsState, setRelationships] = useState<Relationship[]>(
    relationships || []
  );

  const [currentThumbnail, setCurrentThumbnail] = useState<string>(
    getPublicUrl(character.thumbnail) || ""
  );

  const [currentHalfImage, setCurrentHalfImage] = useState<string>(
    getPublicUrl(character.image?.[0]) || ""
  );

  const [currentFullImage, setCurrentFullImage] = useState<string>(
    getPublicUrl(character.image?.[1]) || ""
  );

  const handleRelationshipNameChange = ({
    id,
    name,
    character,
  }: {
    id: number;
    name: string;
    character: { id: number; name: string; thumbnail?: string };
  }) => {
    const updatedRelationships = [...relationshipsState];
    const relationshipIndex = updatedRelationships.findIndex(
      (relationship) => relationship.id === id
    );
    if (relationshipIndex !== -1) {
      updatedRelationships[relationshipIndex].name = name;
    } else {
      updatedRelationships.push({
        id,
        name,
        from_id: character.id, // Assuming `from_id` is the character's ID
        to_id: character.id,
        character,
      });
    }
    setRelationships(updatedRelationships);
  };

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  return (
    <main className="flex flex-col justify-start items-center pt-2 lg:pt-10 w-full lg:max-w-[40rem] mx-auto h-full pb-10 min-h-fit">
      <Suspense fallback={<Loading />}>
        <form
          className="flex flex-col gap-2 items-center w-full lg:max-w-md p-4"
          action={(formData) => {
            updateCharacter(formData, [...properties, ...currentColors]).then(
              (result) => {
                if (result) {
                  toast({
                    description: "캐릭터가 수정되었습니다.",
                    variant: "default",
                  });
                  router.push(`./`);
                } else {
                  toast({
                    description: "캐릭터 수정에 실패했습니다.",
                    variant: "destructive",
                  });
                }
              }
            );
          }}
          onSubmit={(e) => {
            // Prevent double submit from client side while keeping server action
            const form = e.currentTarget as HTMLFormElement;
            if ((form as any)._isSubmitting) {
              e.preventDefault();
              return;
            }
            (form as any)._isSubmitting = true;
            setIsLoading(true);
            // allow form to submit to server action
          }}
        >
          <input type="hidden" name="profile_id" value={character.profile_id} />
          <input type="hidden" name="character_id" value={character.id} />
          <input
            type="hidden"
            name="original_image[]"
            value={character.image?.[0] || ""}
          />
          <input
            type="hidden"
            name="original_image[]"
            value={character.image?.[1] || ""}
          />
          <input
            type="hidden"
            name="original_thumbnail"
            value={character.thumbnail}
          />

          <Tabs
            defaultValue="half"
            className="w-full flex flex-col justify-center items-center"
          >
            <TabsList>
              <TabsTrigger value="half">상반신*</TabsTrigger>
              <TabsTrigger value="full">전신</TabsTrigger>
            </TabsList>
            <TabsContent
              value="half"
              forceMount
              className="hidden data-[state=active]:block"
            >
              <UploadImage
                name={"half"}
                isEdit
                useThumbnail
                icon={<IconHalf className="w-32 h-32" />}
                imageUrl={currentHalfImage}
                thumbnailUrl={currentThumbnail}
              />
            </TabsContent>
            <TabsContent
              value="full"
              forceMount
              className="hidden data-[state=active]:block"
            >
              <UploadImage
                name={"full"}
                isEdit
                icon={<IconFull className="w-32 h-32" />}
                imageUrl={currentFullImage}
              />
            </TabsContent>
          </Tabs>
          <div className="flex flex-col gap-2 w-full justify-center items-center mt-6">
            <input
              className="text-2xl w-full max-w-72 text-center border-background-muted focus:outline-none"
              type="text"
              name="name"
              placeholder="이름"
              defaultValue={character.name}
            />
            <input
              type="text"
              name="description"
              className="text-xl w-full max-w-72 text-center border-background-muted focus:outline-none mb-4"
              placeholder="캐릭터의 한 마디"
              defaultValue={character.description}
            />
          </div>

          <ListProperties
            properties={properties}
            handler={(newValue) => {
              setProperties(newValue);
            }}
          />
          <ColorProperties
            properties={currentColors}
            handler={setCurrentColors}
            editable
          />
          <ButtonAddRelationship
            relationships={relationships || []}
            onChange={setRelationships}
            editable
            profileId={character.profile_id}
            character={character}
          />
          <InputHashtag
            value={currentHashtag}
            hashtags={previewHashtags}
            onChange={(newValue) => {
              if (newValue[newValue.length - 1] === " ") {
                setHashtags(hashtags + newValue);
                setCurrentHashtag("");
              } else setCurrentHashtag(newValue);
            }}
            onDelete={(index) => {
              setHashtags(
                hashtags
                  .trim()
                  .split(" ")
                  .filter((_, i) => i !== index)
                  .join(" ")
              );
            }}
          />

          <button
            type="submit"
            className="text-background-default bg-text-black rounded w-full text-xl p-2 mt-6"
          >
            저장하기
          </button>
          {isLoading ? (
            <OverlayLoading message="캐릭터를 저장 중입니다..." />
          ) : null}
        </form>
      </Suspense>
    </main>
  );
}
