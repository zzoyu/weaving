"use client";
import { Character } from "@/types/character";
import { useState } from "react";

export default function EditForm({ data }: { data: Character }) {
  const [isPassword, setIsPassword] = useState(false);

  return (
    <form className="flex flex-col gap-2 items-center">
      <input type="hidden" name="id" defaultValue={data?.id} />
      <input type="hidden" name="is_password" value={String(isPassword)} />
      <input type="text" name="name" defaultValue={data?.name} />
      <input type="text" name="image" defaultValue={data?.image} />
      {/* add checkbox for password */}
      <label htmlFor="password">
        비밀번호
        <input
          type="checkbox"
          name="password"
          onChange={() => setIsPassword(!isPassword)}
        />
      </label>

      {isPassword && <input type="password" name="password" />}
      <button>Save</button>
    </form>
  );
}
