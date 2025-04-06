"use client";

import { baseProperties } from "@/lib/base-properties";
import { useMemo, useState, useEffect } from "react";
import { Character, EPropertyType, Property } from "@/types/character";
import { Relationship } from "@/types/relationship";
import ListProperties from "../../../add/components/properties/list-properties";
import { ColorProperties } from "../../../add/components/properties/color-properties";
import { ButtonAddRelationship } from "../../../add/components/button-add-relationship";
import InputHashtag from "../../../add/components/input-hashtag";
import { updateCharacter } from "../../../add/actions";

export default function CharacterEditTemplate({
  character,
  relationships,
}: {
  character: Character;
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

  const [colors, setColors] = useState<Property[]>(
    character.properties || [
      { key: "themeColor", value: "", type: EPropertyType.COLOR },
      { key: "eyeColor", value: "", type: EPropertyType.COLOR },
      { key: "hairColor", value: "", type: EPropertyType.COLOR },
    ]
  );

  const [relationshipsState, setRelationships] = useState<Relationship[]>(
    relationships || []
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

  useEffect(() => {
    setIsLoading(true);
    // Simulate data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Replace with actual data fetching logic
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-2 items-center w-full md:max-w-md p-4"
      action={(formData) => updateCharacter(formData, properties)}
    >
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
      <ColorProperties properties={colors} handler={setColors} editable />
      <hr className="mt-2 p-2 w-full" />
      <ButtonAddRelationship
        relationships={relationships || []}
        onChange={setRelationships}
        editable
        profileId={character.profile_id}
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
