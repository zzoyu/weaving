"use client";

import InputHashtag from "@/app/components/input-hashtag";
import { ColorProperties } from "@/app/components/properties/color-properties";
import OverlayLoading from "@/components/overlay-loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { baseProperties } from "@/lib/base-properties";
import IconFull from "@/public/assets/icons/image/full.svg";
import IconHalf from "@/public/assets/icons/image/half.svg";
import { Character, Property } from "@/types/character";
import { PlanLimit } from "@/types/plan";
import { Relationship } from "@/types/relationship";
import { getPublicUrl } from "@/utils/image";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { updateCharacter } from "../../../add/actions";
import { ButtonAddRelationship } from "../../../add/components/button-add-relationship";
import UploadImage from "../../../add/components/upload-image/upload-image";
import Loading from "../../loading";
import { usePropertyValidation } from "../hooks/use-property-validation";
import { updateCharacterSchema } from "../schema";
import ListPropertiesWithValidation from "./list-properties-with-validation";

export default function CharacterEditTemplate({
  character,
  relationships,
  colors,
  planLimit,
}: {
  character: Character;
  colors: Property[];
  relationships?: Relationship[];
  planLimit: PlanLimit;
}) {
  const [properties, setProperties] = useState<Property[]>(
    character?.properties.map((p) => ({ ...p, uuid: crypto.randomUUID() }))
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
  const combinedProperties = useMemo(() => {
    const colorProperties = currentColors.map((color) => ({
      key: color.key,
      value: color.value,
      type: color.type,
    }));

    return [...properties, ...colorProperties];
  }, [properties, currentColors]);

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

  const handleRelationshipNameChange = (character: Character) => {
    const updatedRelationships = [...relationshipsState];
    const relationshipIndex = updatedRelationships.findIndex(
      (relationship) => relationship.to_id === character.id
    );
    if (relationshipIndex !== -1) {
      updatedRelationships[relationshipIndex].name = character.name;
    } else {
      updatedRelationships.push({
        from_id: character.profile_id,
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
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: zodResolver(updateCharacterSchema(planLimit)),
    mode: "onChange",
    defaultValues: {
      name: character.name,
      description: character.description || "",
      properties: [...baseProperties],
      relationships: relationshipsState,
      hashtags: hashtags.trim(),
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsInitialized(true);
  }, []);

  // properties가 바뀔 때마다 react-hook-form에 값 할당 (validation용)
  useEffect(() => {
    setValue("properties", combinedProperties);
    if (isInitialized) {
      trigger("properties");
    }
  }, [combinedProperties, setValue, trigger, isInitialized]);

  // properties 개별 항목 변경 시 실시간 validation
  useEffect(() => {
    if (isInitialized) {
      const timeoutId = setTimeout(() => {
        trigger("properties");
      }, 300); // 300ms 디바운스
      return () => clearTimeout(timeoutId);
    }
  }, [properties, trigger, isInitialized]);

  useEffect(() => {
    setValue("relationships", relationshipsState);
    if (isInitialized) {
      trigger("relationships");
    }
  }, [relationshipsState, setValue, trigger, isInitialized]);

  useEffect(() => {
    setValue("hashtags", hashtags);
    if (isInitialized) {
      trigger("hashtags");
    }
  }, [hashtags, setValue, trigger, isInitialized]);

  const variants = {
    input: {
      error:
        "text-2xl w-full max-w-72 text-center border-red-500 focus:outline-none",
      default:
        "text-2xl w-full max-w-72 text-center border-primary focus:outline-none",
    },
  };

  useUnsavedChangesWarning(isDirty && !isSubmitted);

  // Custom property validation
  const { validationErrors, hasErrors, getPropertyError } =
    usePropertyValidation(combinedProperties);

  return (
    <main className="flex flex-col justify-start items-center pt-2 lg:pt-10 w-full lg:max-w-[40rem] mx-auto h-full pb-10 min-h-fit">
      <Suspense fallback={<Loading />}>
        <form
          className="flex flex-col gap-2 items-center w-full lg:max-w-md p-4"
          onSubmit={handleSubmit(async (data) => {
            setIsLoading(true);
            setIsSubmitted(true);
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

              // Add character info to FormData
              formData.append("profile_id", character.profile_id.toString());
              formData.append("character_id", character.id.toString());

              // Add original image info
              formData.append("original_image[]", character.image?.[0] || "");
              formData.append("original_image[]", character.image?.[1] || "");
              formData.append("original_thumbnail", character.thumbnail || "");

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

              console.log("🎯 클라이언트에서 updateCharacter 호출 시작");
              console.log("📋 FormData 내용:", Array.from(formData.entries()));
              console.log("🔧 Properties:", combinedProperties);

              const result = await updateCharacter(
                formData,
                combinedProperties
              );

              console.log("📤 updateCharacter 결과:", result);

              if (result) {
                toast({
                  description: "캐릭터가 수정되었습니다.",
                  variant: "default",
                });
                router.push(`./`);
              } else {
                setIsSubmitted(false);
                toast({
                  description: "캐릭터 수정에 실패했습니다.",
                  variant: "destructive",
                });
              }
            } catch (err) {
              setIsSubmitted(false);
              toast({
                description:
                  err instanceof Error
                    ? err.message
                    : "캐릭터 수정에 실패했습니다.",
                variant: "destructive",
              });
            } finally {
              setIsLoading(false);
            }
          })}
        >
          <input type="hidden" name="profile_id" value={character.profile_id} />
          <input type="hidden" name="character_id" value={character.id} />

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
          <div className="flex flex-col gap-2 w-full justify-center items-center mt-6 mb-4">
            <input
              className={clsx(
                errors.name ? variants.input.error : variants.input.default
              )}
              type="text"
              {...register("name")}
              placeholder="이름"
            />
            {errors.name && (
              <span className="text-red-500 text-sm flex items-center gap-1">
                <CircleAlert className="text-red-500 w-4 h-4" />
                {errors.name.message}
              </span>
            )}
            <input
              type="text"
              {...register("description")}
              className={clsx(
                errors.description
                  ? variants.input.error
                  : variants.input.default
              )}
              placeholder="캐릭터의 한 마디"
            />
            {errors.description && (
              <span className="text-red-500 text-sm flex items-center gap-1">
                <CircleAlert className="inline w-4 h-4" />
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <ListPropertiesWithValidation
              properties={properties}
              handler={(newValue: Property[]) => {
                if (!newValue) return;
                setProperties(newValue);
                // 즉시 validation 실행
                if (isInitialized) {
                  setTimeout(() => trigger("properties"), 100);
                }
              }}
              getPropertyError={getPropertyError}
            />
            {/* react-hook-form errors 표시 */}
            {errors.properties &&
              typeof errors.properties.message === "string" && (
                <span className="text-red-500 text-sm flex items-center gap-1 justify-center mt-2">
                  <CircleAlert className="w-4 h-4" />
                  {errors.properties.message}
                </span>
              )}
            {/* Custom validation errors 표시 */}
            {hasErrors && (
              <span className="text-red-500 text-sm flex items-center gap-1 justify-center mt-2">
                <CircleAlert className="w-4 h-4" />
                입력값을 확인해 주세요
              </span>
            )}
          </div>
          <div className=" px-10 w-full">
            <ColorProperties
              properties={currentColors}
              handler={setCurrentColors}
              editable
            />
          </div>
          <ButtonAddRelationship
            relationships={relationshipsState}
            onChange={setRelationships}
            editable
            profileId={character.profile_id}
            error={errors?.relationships}
            character={character}
          />
          <InputHashtag
            error={errors.hashtags}
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
            value={JSON.stringify(relationshipsState)}
          />
          <input type="hidden" {...register("hashtags")} value={hashtags} />

          <button
            type="submit"
            disabled={isLoading}
            className="text-background-default bg-text-black rounded w-full text-xl p-2"
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
