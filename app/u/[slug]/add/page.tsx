"use client";

import { useState } from "react";
import ListProperties from "./components/properties/list-properties";
import UploadImage from "./components/upload-image/upload-image";
import { baseProperties } from "@/lib/base-properties";
import { createCharacter } from "./actions";

export default function NewCharacterPage({
  params,
}: {
  params: { slug: string };
}) {
  const [properties, setProperties] = useState([...baseProperties]);

  return (
    <div>
      <h1>캐릭터 추가</h1>
      <form
        className="flex flex-col gap-2 items-center"
        action={(formData) => createCharacter(formData, properties)}
      >
        <input type="hidden" name="profile_slug" value={params.slug} />
        <UploadImage />
        <label htmlFor="name">
          이름 <input type="text" name="name" placeholder="이름" />
        </label>
        <label htmlFor="description">
          한마디 <input type="text" name="description" placeholder="한마디" />
        </label>

        <ListProperties properties={properties} handler={setProperties} />
        <button type="submit">추가</button>
      </form>
    </div>
  );
}
