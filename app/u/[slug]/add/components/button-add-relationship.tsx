"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Character } from "@/types/character";
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
  relationships?: {
    name: string;
    characterName: string;
    characterId: number;
  }[];
  characters: Character[];
  isLoading?: boolean;
}) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-10 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="w-96 h-fit bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-center text-xl my-4">캐릭터 선택</h2>
        <div className="gap-2 p-4 flex flex-col">
          {!isLoading && characters.length > 0 ? (
            characters.map((character) => (
              <div className="flex justify-between" key={character.id}>
                <div
                  className="flex items-center cursor-pointer gap-4"
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
                      (type) => type.label === value
                    );
                    if (selectedType && addRelationship) {
                      addRelationship({
                        name: selectedType.label,
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
                        value={type.label}
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
            <div className="col-span-7 text-center">
              <p>추가 할 수 있는 캐릭터가 없습니다.</p>
            </div>
          )}
        </div>
        <button
          type="button"
          className="w-full p-2 mt-4 bg-primary-200 text-white"
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
}: {
  profileId: number;
  onChange: (
    data: {
      name: string;
      characterId: number;
      characterName: string;
    }[]
  ) => void;
  editable?: boolean;
  relationships: {
    name: string;
    characterName: string;
    characterId: number;
  }[];
}) {
  const [tempRelationships, setRelationships] = useState<
    {
      name: string;
      characterName: string;
      characterId: number;
    }[]
  >(relationships);

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
          setCharacters(data);
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
              (rel) => rel.characterId === data.characterId
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
                name: data.name,
                characterName: data.characterName,
                characterId: data.characterId,
              },
            ]);
            onChange([
              ...tempRelationships,
              {
                name: data.name,
                characterName: data.characterName,
                characterId: data.characterId,
              },
            ]);
            setIsOpen(false);
          }}
          relationships={tempRelationships}
          characters={characters}
        />
        <button
          className="py-2 rounded bg-secondary-100 text-sm w-full"
          type="button"
          onClick={() => {
            setIsMine(true);
            openModal(true);
          }}
        >
          내 프로필에서
          <br />
          선택하기
        </button>
        <button
          className="py-2 rounded bg-secondary-100 text-sm w-full"
          type="button"
          onClick={() => {
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
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <span>{relationship.characterName}</span>
              <div className="flex items-center gap-2">
                <span
                  className={
                    relationshipTypes.find(
                      (type) => type.label === relationship.name
                    )?.color
                  }
                >
                  {
                    relationshipTypes.find(
                      (type) => type.label === relationship.name
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
                    <option key={type.label} value={type.label}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
