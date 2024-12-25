"use client";

import { use, useMemo, useState } from "react";
import ListProperties from "./components/properties/list-properties";
import UploadImage from "./components/upload-image/upload-image";
import { baseProperties } from "@/lib/base-properties";
import { createCharacter } from "./actions";
import { TabHeader } from "../components/tab-header";
import { EPropertyType, Property } from "@/types/character";
import { ColorProperties } from "./components/properties/color-properties";
import InputHashtag from "./components/input-hashtag";

export default function NewCharacterPage({
  params,
}: {
  params: { slug: string };
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

  const [colors, setColors] = useState<Property[]>([
    { key: "themeColor", value: "", type: EPropertyType.COLOR },
    { key: "eyeColor", value: "", type: EPropertyType.COLOR },
    { key: "hairColor", value: "", type: EPropertyType.COLOR },
  ]);
  return (
    <main className="flex flex-col justify-center items-center pt-10 w-full md:max-w-[40rem] mx-auto gap-10">
      <TabHeader slug={params.slug} activeIndex={1} />
      <form
        className="flex flex-col gap-2 items-center w-full md:max-w-md p-4"
        action={(formData) => createCharacter(formData, properties)}
      >
        <input type="hidden" name="profile_slug" value={params.slug} />

        <UploadImage />
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

        <ListProperties properties={properties} handler={setProperties} />
        <hr className="mt-2 p-2 w-full" />
        <ColorProperties properties={colors} handler={setColors} editable />
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
    </main>
  );
}
