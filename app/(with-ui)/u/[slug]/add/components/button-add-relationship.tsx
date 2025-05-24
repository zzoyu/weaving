"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Character } from "@/types/character";
import { Relationship } from "@/types/relationship";
import React, { useState } from "react";
import {
  fetchCharactersByProfileId,
  fetchCharactersFromFriendsByProfileId,
} from "../../actions";

const relationshipTypes = [
  { label: "LOVE", name: "love", icon: "❤️", color: "text-red-500" },
  { label: "FRIEND", name: "friend", icon: "⭐", color: "text-green-500" },
  { label: "HATE", name: "hate", icon: "♠️", color: "text-black" },
  { label: "FAMILY", name: "family", icon: "🟡", color: "text-yellow-500" },
];

function RelationshipModal({
  isOpen,
  onClose,
  addRelationship,
  relationships,
  characters,
  isLoading,
}: {
  editable?: boolean;
  isOpen: boolean;
  onClose: () => void;
  addRelationship?: (data: {
    name: string;
    characterId: number;
    characterName: string;
  }) => void;
  relationships?: Relationship[];
  characters: Character[];
  isLoading?: boolean;
}) {
  const filteredCharacters = characters.filter((character) => {
    const existingRelationship = relationships?.find(
      (relationship) => relationship.character?.id === character.id
    );
    return !existingRelationship;
  });
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-30 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="w-96 h-fit bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-center text-xl my-4">캐릭터 선택</h2>
        <div className="gap-2 p-4 flex flex-col w-full overflow-y-auto h-96">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                className="flex justify-between items-center gap-2"
                key={index}
              >
                <Skeleton className="w-16 h-16 rounded-full shrink-0" />
                <Skeleton className="h-16 w-full rounded" />
              </div>
            ))
          ) : filteredCharacters.length > 0 ? (
            filteredCharacters.map((character) => (
              <div
                className="flex justify-between items-center"
                key={character.id}
              >
                <div
                  className="flex items-center justify-center cursor-pointer gap-4"
                  onClick={() => {}}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={character.thumbnail}
                    alt={character.name}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <span>{character.name}</span>
                </div>
                <Select
                  onValueChange={(value) => {
                    const selectedType = relationshipTypes.find(
                      (type) => type.name === value
                    );
                    if (selectedType && addRelationship) {
                      addRelationship({
                        name: selectedType.name,
                        characterId: character.id,
                        characterName: character.name,
                      });
                    }
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="관계" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="관계"
                      className="flex items-center gap-2"
                    >
                      <span className="text-gray-400">관계</span>
                    </SelectItem>
                    {relationshipTypes.map((type) => (
                      <SelectItem
                        key={type.label}
                        value={type.name}
                        className="flex items-center gap-2"
                      >
                        <span className={type.color}>{type.icon}</span>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))
          ) : (
            <div className="col-span-7 text-center h-full flex items-center justify-center">
              <p>추가 할 수 있는 캐릭터가 없습니다.</p>
            </div>
          )}
        </div>
        <button
          type="button"
          className="w-full p-2 mt-4 bg-text-black text-background-default"
          onClick={() => onClose()}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export function ButtonAddRelationship({
  profileId,
  onChange,
  editable = false,
  relationships,
  character,
}: {
  profileId: number;
  onChange: (data: Relationship[]) => void;
  editable?: boolean;
  relationships: Relationship[];
  character?: Character;
}) {
  const [tempRelationships, setRelationships] =
    useState<Relationship[]>(relationships);

  const handleTypeChange = (index: number, newType: string) => {
    const updatedRelationships = [...tempRelationships];
    updatedRelationships[index].name = newType;
    setRelationships(updatedRelationships);
    onChange(updatedRelationships);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (isMine: boolean) => {
    if (isMine) {
      setIsMine(true);
      setIsOpen(true);
    } else {
      setIsMine(false);
      setIsOpen(true);
    }
  };

  const [characters, setCharacters] = useState<Character[]>([]);
  React.useEffect(() => {
    if (!isOpen) return;

    const fetchCharacters = async () => {
      setIsLoading(true);
      if (isMine) {
        const { data } = await fetchCharactersByProfileId(profileId);
        if (data) {
          setCharacters(
            data.filter((relatable) => relatable.id !== character?.id)
          );
        }
      }
      if (!isMine) {
        const data = await fetchCharactersFromFriendsByProfileId(profileId);
        if (data) {
          setCharacters(data);
        }
      }
      setIsLoading(false);
    };
    fetchCharacters();
  }, [isOpen]);

  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-bold mb-4">관계 인물</h2>
      <div className="flex gap-4 mb-4 w-full">
        <RelationshipModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setIsMine(false);
          }}
          addRelationship={(data) => {
            const existingItem = tempRelationships.find(
              (rel) => rel.character?.id === data.characterId
            );
            if (existingItem) {
              existingItem.name = data.name;
              setRelationships([...tempRelationships]);
              onChange([...tempRelationships]);
              setIsOpen(false);
              return;
            }
            setRelationships((prev) => [
              ...prev,
              {
                id: Date.now(), // Temporary ID for new relationships
                name: data.name,
                from_id: profileId,
                to_id: data.characterId,
                character: {
                  id: data.characterId,
                  name: data.characterName,
                  thumbnail: "", // Placeholder for thumbnail
                },
              },
            ]);
            onChange([
              ...tempRelationships,
              {
                id: Date.now(),
                name: data.name,
                from_id: profileId,
                to_id: data.characterId,
                character: {
                  id: data.characterId,
                  name: data.characterName,
                  thumbnail: "",
                },
              },
            ]);
            setIsOpen(false);
          }}
          relationships={tempRelationships}
          characters={characters}
          isLoading={isLoading}
        />
        <button
          className="py-2 rounded bg-background-muted text-sm w-full"
          type="button"
          onClick={() => {
            setIsLoading(true);
            setIsMine(true);
            openModal(true);
          }}
        >
          내 프로필에서
          <br />
          선택하기
        </button>
        <button
          className="py-2 rounded bg-background-muted text-sm w-full"
          type="button"
          onClick={() => {
            setIsLoading(true);
            setIsMine(false);
            openModal(false);
          }}
        >
          친구 프로필에서
          <br />
          선택하기
        </button>
      </div>
      {tempRelationships.length > 0 && (
        <div className="bg-gray-200 p-4 rounded">
          {tempRelationships.map((relationship, index) => (
            <div
              key={relationship.id}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <input
                type="hidden"
                name={`relationship_to`}
                value={relationship.to_id}
              />
              <input
                type="hidden"
                name={`relationship_name`}
                value={relationship.name}
              />
              <span>{relationship.character?.name}</span>
              <div className="flex items-center gap-2">
                <span
                  className={
                    relationshipTypes.find(
                      (type) => type.name === relationship.name
                    )?.color
                  }
                >
                  {
                    relationshipTypes.find(
                      (type) => type.name === relationship.name
                    )?.icon
                  }
                </span>
                <select
                  className="border rounded p-1"
                  value={relationship.name}
                  onChange={(e) => {
                    const newType = e.target.value;
                    handleTypeChange(index, newType);
                  }}
                >
                  {relationshipTypes.map((type) => (
                    <option key={type.label} value={type.name}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <button>
                  <span
                    onClick={() => {
                      const updatedRelationships = tempRelationships.filter(
                        (_, i) => i !== index
                      );
                      setRelationships(updatedRelationships);
                      onChange(updatedRelationships);
                    }}
                  >
                    X
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
