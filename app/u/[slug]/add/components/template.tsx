"use client";

import { baseProperties } from "@/lib/base-properties";
import { TabHeader } from "../../components/tab-header";
import { useMemo, useState } from "react";
import { EPropertyType, Property, Character } from "@/types/character";
import { createCharacter } from "../actions";
import UploadImage from "./upload-image/upload-image";
import ListProperties from "./properties/list-properties";
import { ColorProperties } from "./properties/color-properties";
import InputHashtag from "./input-hashtag";
import { ButtonAddRelationship } from "./button-add-relationship";
import { Relationship } from "@/types/relationship";

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

  return (
    <form
      className="flex flex-col gap-2 items-center w-full md:max-w-md p-4"
      action={(formData) => createCharacter(formData, combinedProperties)}
    >
      <input type="hidden" name="profile_slug" value={slug} />

      <UploadImage name={"face"} useThumbnail />
      <UploadImage name={"half"} />
      <UploadImage name={"full"} />
      <div className="flex flex-col gap-2 w-full justify-center items-center mt-6">
        <input
          className=" text-2xl w-full max-w-72 text-center border-primary-100 focus:outline-none"
          type="text"
          name="name"
          placeholder="이름"
        />
        <input
          type="text"
          name="description"
          className="text-xl w-full max-w-72 text-center border-primary-100  focus:outline-none mb-4"
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
        className="bg-primary-200 text-white rounded w-full text-xl p-2"
      >
        저장하기
      </button>
    </form>
  );
}
