"use client";

import InputHashtag from "@/app/components/input-hashtag";
import { ColorProperties } from "@/app/components/properties/color-properties";
import StatsProperties from "@/app/components/properties/stats-properties";
import OverlayLoading from "@/components/overlay-loading";
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
import clsx from "clsx";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createCharacter } from "../actions";
import { usePropertyValidation } from "../hooks/use-property-validation";
import { createCharacterSchema } from "../schema";
import { ButtonAddRelationship } from "./button-add-relationship";
import ListPropertiesWithValidation from "./list-properties-with-validation";
import UploadImage from "./upload-image/upload-image";

// 간단한 ID 생성 함수
const generateId = () => Math.random().toString(36).substr(2, 9);

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
  const [properties, setProperties] = useState<Property[]>(
    [...baseProperties].map((p) => ({ ...p, uuid: generateId() }))
  );
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

  const [stats, setStats] = useState<Property[]>([
    { key: "", value: "0", type: EPropertyType.STAT },
    { key: "", value: "0", type: EPropertyType.STAT },
    { key: "", value: "0", type: EPropertyType.STAT },
    { key: "", value: "0", type: EPropertyType.STAT },
    { key: "", value: "0", type: EPropertyType.STAT },
    { key: "", value: "0", type: EPropertyType.STAT },
  ]);

  const combinedProperties = useMemo(() => {
    const colorProperties = colors.map((color) => ({
      key: color.key,
      value: color.value,
      type: color.type,
    }));

    const statsProperties = stats.filter((stat) => stat.key.trim?.() !== "");

    return [...properties, ...colorProperties, ...statsProperties];
  }, [properties, colors, stats]);

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
    resolver: zodResolver(createCharacterSchema(planLimit)),
    mode: "onChange",
    defaultValues: {
      profile_slug: slug,
      properties: [...baseProperties],
      relationships: [],
      hashtags: "",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // properties가 바뀔 때마다 react-hook-form에 값 할당 (validation용)
  useEffect(() => {
    setValue("properties", combinedProperties);
    trigger("properties");
  }, [combinedProperties, setValue, trigger]);

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
    setValue("relationships", relationships);
    // if (isInitialized) {
    trigger("relationships"); // 초기화 후에만 validation 트리거
    // }
  }, [relationships, setValue, trigger, isInitialized]);

  useEffect(() => {
    setValue("hashtags", hashtags);
    // if (isInitialized) {
    trigger("hashtags"); // 초기화 후에만 validation 트리거
    // }
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
  const { validationErrors, hasErrors, getPropertyError, getLengthError } =
    usePropertyValidation(combinedProperties);

  return (
    <form
      className="flex flex-col gap-2 items-center w-full lg:max-w-md p-4"
      onSubmit={handleSubmit(async (data) => {
        console.log("Submitting data:", data);
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
            setIsSubmitted(false);
            toast({
              description: res?.message || "캐릭터 생성에 실패했습니다.",
              variant: "destructive",
            });
          }
        } catch (err) {
          setIsSubmitted(false);
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
            errors.description ? variants.input.error : variants.input.default
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
          getLengthError={getLengthError}
        />
        {/* react-hook-form errors 표시 */}
        {errors.properties && typeof errors.properties.message === "string" && (
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

      <div className="px-10 w-full mb-4">
        <ColorProperties properties={colors} handler={setColors} editable />
      </div>
      {planLimit.availableFeatures.includes("character.stats") && (
        <StatsProperties
          properties={stats.map((stat, index) => ({
            id: generateId(),
            name: stat.key,
            value: parseInt(stat.value) || 0,
            fullMark: 10,
          }))}
          handler={(
            newValue: {
              id?: string;
              name: string;
              value: number;
              fullMark: number;
            }[]
          ) => {
            const updatedStats = newValue
              .filter((stat) => stat.name.trim() !== "")
              .map((stat) => ({
                key: stat?.name || "",
                value: stat?.value.toString() || "0",
                type: EPropertyType.STAT,
              }));
            setStats(updatedStats);
          }}
        />
      )}

      <ButtonAddRelationship
        relationships={relationships}
        onChange={setRelationships}
        editable
        profileId={profileId}
        error={errors?.relationships}
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
      {isLoading ? (
        <OverlayLoading message="캐릭터를 생성 중입니다..." />
      ) : null}
    </form>
  );
}
