"use client";

import { useState } from "react";
import ListProperties from "./components/properties/list-properties";
import UploadImage from "./components/upload-image/upload-image";
import { baseProperties } from "@/lib/base-properties";
import { createCharacter } from "./actions";
import { TabHeader } from "../components/tab-header";

export default function NewCharacterPage({
  params,
}: {
  params: { slug: string };
}) {
  const [properties, setProperties] = useState([...baseProperties]);

  return (
    <main className="flex flex-col justify-center items-center pt-10 max-w-[40rem] mx-auto gap-10">
      <TabHeader slug={params.slug} activeIndex={1} />
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
    </main>
  );
}
