"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { baseProperties } from "@/lib/base-properties";
import IconFull from "@/public/assets/icons/image/full.svg";
import IconHalf from "@/public/assets/icons/image/half.svg";
import { Character, EPropertyType, Property } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createCharacter } from "../actions";
import { ButtonAddRelationship } from "./button-add-relationship";
import InputHashtag from "./input-hashtag";
import { ColorProperties } from "./properties/color-properties";
import ListProperties from "./properties/list-properties";
import UploadImage from "./upload-image/upload-image";

export default function CharacterAddTemplate({
  slug,
  profileId,
  character,
}: {
  slug: string;
  profileId: number;
  character?: Character;
}) {
  const [properties, setProperties] = useState([...baseProperties]);
  const [hashtags, setHashtags] = useState<string>("");
  const [currentHashtag, setCurrentHashtag] = useState<string>("");
  const previewHashtags = useMemo(() => {
    if (!hashtags) return [];
    return hashtags
      .trim()
      .split(" ")
      .map((tag) => tag.trim());
  }, [hashtags]);

  const [colors, setColors] = useState<Property[]>(
    character?.properties?.filter((property) =>
      ["themeColor", "eyeColor", "hairColor"].includes(property.key)
    ) || [
      { key: "themeColor", value: "", type: EPropertyType.COLOR },
      { key: "eyeColor", value: "", type: EPropertyType.COLOR },
      { key: "hairColor", value: "", type: EPropertyType.COLOR },
    ]
  );
  const combinedProperties = useMemo(() => {
    const colorProperties = colors.map((color) => ({
      key: color.key,
      value: color.value,
      type: color.type,
    }));

    return [...properties, ...colorProperties];
  }, [properties, colors]);

  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const handleRelationshipNameChange = (character: Character) => {
    const updatedRelationships = [...relationships];
    const relationshipIndex = updatedRelationships.findIndex(
      (relationship) => relationship.to_id === character.id
    );
    if (relationshipIndex !== -1) {
      updatedRelationships[relationshipIndex].name = character.name;
    } else {
      updatedRelationships.push({
        from_id: profileId,
        to_id: character.id,
        name: character.name,
        character: {
          id: character.id,
          name: character.name,
          thumbnail: character.thumbnail,
        },
      });
    }
    setRelationships(updatedRelationships);
  };

  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      className="flex flex-col gap-2 items-center w-full md:max-w-md p-4"
      action={(formData) => {
        setIsLoading(true);
        createCharacter(formData, combinedProperties)
          .then((res) => {
            if (res) {
              toast({
                title: "캐릭터 생성",
                description: "캐릭터가 생성되었습니다.",
                variant: "default",
              });
              router.push(`/u/${slug}`);
            }
          })
          .catch((err) => {
            toast({
              title: "캐릭터 생성 실패",
              description: "캐릭터 생성에 실패했습니다.",
              variant: "destructive",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }}
    >
      <input type="hidden" name="profile_slug" value={slug} />

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
          />
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-2 w-full justify-center items-center mt-6">
        <input
          className=" text-2xl w-full max-w-72 text-center border-primary focus:outline-none"
          type="text"
          name="name"
          placeholder="이름"
        />
        <input
          type="text"
          name="description"
          className="text-xl w-full max-w-72 text-center border-primary  focus:outline-none mb-4"
          placeholder="캐릭터의 한 마디"
        />
      </div>

      <ListProperties
        properties={properties}
        handler={(newValue) => {
          setProperties(newValue);
        }}
      />
      <hr className="mt-2 p-2 w-full" />
      <ColorProperties properties={colors} handler={setColors} editable />
      <hr className="mt-2 p-2 w-full" />
      <ButtonAddRelationship
        relationships={relationships}
        onChange={setRelationships}
        editable
        profileId={profileId}
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
        disabled={isLoading}
        className="bg-primary-200 text-white rounded w-full text-xl p-2"
      >
        저장하기
      </button>
    </form>
  );
}
