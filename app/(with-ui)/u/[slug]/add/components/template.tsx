"use client";

import InputHashtag from "@/app/components/input-hashtag";
import { ColorProperties } from "@/app/components/properties/color-properties";
import ListProperties from "@/app/components/properties/list-properties";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { baseProperties } from "@/lib/base-properties";
import IconFull from "@/public/assets/icons/image/full.svg";
import IconHalf from "@/public/assets/icons/image/half.svg";
import { Character, EPropertyType, Property } from "@/types/character";
import { PlanLimit } from "@/types/plan";
import { Relationship } from "@/types/relationship";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createCharacter } from "../actions";
import { createCharacterSchema } from "../schema";
import { ButtonAddRelationship } from "./button-add-relationship";
import UploadImage from "./upload-image/upload-image";

export default function CharacterAddTemplate({
  slug,
  profileId,
  character,
  planLimit,
}: {
  slug: string;
  profileId: number;
  character?: Character;
  planLimit: PlanLimit;
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

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createCharacterSchema(planLimit)),
    defaultValues: {
      profile_slug: slug,
      properties: combinedProperties,
      relationships,
      hashtags: "",
    },
  });

  useUnsavedChangesWarning(isDirty);

  return (
    <form
      className="flex flex-col gap-2 items-center w-full md:max-w-md p-4"
      onSubmit={handleSubmit(async (data) => {
        setIsLoading(true);
        try {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            if (value instanceof File) {
              formData.append(key, value);
            } else if (typeof value === "string") {
              formData.append(key, value);
            } else if (Array.isArray(value)) {
              formData.append(key, JSON.stringify(value));
            }
          });

          // Add profile_id to FormData
          formData.append("profile_id", profileId.toString());

          // Add image files from UploadImage component
          const halfImageInput = document.querySelector(
            'input[name="half-image"]'
          ) as HTMLInputElement;
          const fullImageInput = document.querySelector(
            'input[name="full-image"]'
          ) as HTMLInputElement;
          const halfThumbnailInput = document.querySelector(
            'input[name="half-thumbnail"]'
          ) as HTMLInputElement;

          if (halfImageInput?.files?.[0]) {
            formData.append("half-image", halfImageInput.files[0]);
          }
          if (fullImageInput?.files?.[0]) {
            formData.append("full-image", fullImageInput.files[0]);
          }
          if (halfThumbnailInput?.files?.[0]) {
            formData.append("half-thumbnail", halfThumbnailInput.files[0]);
          }

          const res = await createCharacter(formData, combinedProperties);
          if (res && res.success) {
            toast({
              description: "캐릭터가 생성되었습니다.",
              variant: "default",
            });
            router.push(`/u/${slug}`);
          } else {
            toast({
              description: res?.message || "캐릭터 생성에 실패했습니다.",
              variant: "destructive",
            });
          }
        } catch (err) {
          toast({
            description:
              err instanceof Error
                ? err.message
                : "캐릭터 생성에 실패했습니다.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      })}
    >
      <input type="hidden" name="profile_id" value={profileId} />

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
          className="text-2xl w-full max-w-72 text-center border-primary focus:outline-none placeholder:text-gray-400 placeholder:text-base"
          type="text"
          {...register("name")}
          placeholder="이름"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
        <input
          type="text"
          {...register("description")}
          className="text-xl w-full max-w-72 text-center border-primary focus:outline-none mb-4 placeholder:text-gray-400 placeholder:text-sm"
          placeholder="캐릭터의 한 마디"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      <ListProperties
        properties={properties}
        handler={(newValue) => {
          setProperties(newValue);
        }}
      />
      <div className=" px-10 w-full">
        <ColorProperties properties={colors} handler={setColors} editable />
      </div>
      <ButtonAddRelationship
        relationships={relationships}
        onChange={setRelationships}
        editable
        profileId={profileId}
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

      <input
        type="hidden"
        {...register("properties")}
        value={JSON.stringify(combinedProperties)}
      />
      <input
        type="hidden"
        {...register("relationships")}
        value={JSON.stringify(relationships)}
      />
      <input type="hidden" {...register("hashtags")} value={hashtags} />

      <button
        type="submit"
        disabled={isLoading}
        className="text-background-default bg-text-black rounded w-full text-xl p-2"
      >
        저장하기
      </button>
    </form>
  );
}
