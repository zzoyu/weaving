"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { baseProperties } from "@/lib/base-properties";
import { Character, Property } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { Suspense, useMemo, useState } from "react";
import { updateCharacter } from "../../../add/actions";
import { ButtonAddRelationship } from "../../../add/components/button-add-relationship";
import InputHashtag from "../../../add/components/input-hashtag";
import { ColorProperties } from "../../../add/components/properties/color-properties";
import ListProperties from "../../../add/components/properties/list-properties";
import UploadImage from "../../../add/components/upload-image/upload-image";
import Loading from "../../loading";

import { useToast } from "@/hooks/use-toast";
import IconFull from "@/public/assets/icons/image/full.svg";
import IconHalf from "@/public/assets/icons/image/half.svg";
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
    character?.properties || [...baseProperties]
  );
  const [hashtags, setHashtags] = useState<string>(character.hashtags || "");
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
    character.thumbnail || ""
  );

  const [currentHalfImage, setCurrentHalfImage] = useState<string>(
    character.image?.[0] || ""
  );

  const [currentFullImage, setCurrentFullImage] = useState<string>(
    character.image?.[1] || ""
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
    <main className="flex flex-col justify-start items-center pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto h-full pb-10 min-h-fit">
      <Suspense fallback={<Loading />}>
        <form
          className="flex flex-col gap-2 items-center w-full md:max-w-md p-4"
          action={(formData) => {
            updateCharacter(formData, [...properties, ...currentColors]).then(
              (result) => {
                if (result) {
                  toast({
                    title: "캐릭터 수정",
                    description: "캐릭터가 수정되었습니다.",
                    variant: "default",
                  });
                  router.push(`/u/${character.profile_id}`);
                } else {
                  toast({
                    title: "캐릭터 수정 실패",
                    description: "캐릭터 수정에 실패했습니다.",
                    variant: "destructive",
                  });
                }
              }
            );
          }}
        >
          <input type="hidden" name="character_id" value={character.id} />
          <input
            type="hidden"
            name="original_image"
            value={character.image?.[0]}
          />
          <input
            type="hidden"
            name="original_image"
            value={character.image?.[1]}
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
                icon={<IconFull className="w-32 h-32" />}
                imageUrl={currentFullImage}
              />
            </TabsContent>
          </Tabs>
          <div className="flex flex-col gap-2 w-full justify-center items-center mt-6">
            <input
              className="text-2xl w-full max-w-72 text-center border-primary-100 focus:outline-none"
              type="text"
              name="name"
              placeholder="이름"
              defaultValue={character.name}
            />
            <input
              type="text"
              name="description"
              className="text-xl w-full max-w-72 text-center border-primary-100 focus:outline-none mb-4"
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
          <hr className="mt-2 p-2 w-full" />
          <ColorProperties
            properties={currentColors}
            handler={setCurrentColors}
            editable
          />
          <hr className="mt-2 p-2 w-full" />
          <ButtonAddRelationship
            relationships={relationships || []}
            onChange={setRelationships}
            editable
            profileId={character.profile_id}
            character={character}
          />
          <hr className="mt-2 p-2 w-full" />
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
            className="bg-primary-200 text-white rounded w-full text-xl p-2"
          >
            저장하기
          </button>
        </form>
      </Suspense>
    </main>
  );
}
