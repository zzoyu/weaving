"use server";

import { Character } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function fetchCharacter(id: number): Promise<Character | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("character")
    .select()
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw error;
  }
  revalidateTag("relationships");
  return data;
}

export async function fetchRelationships(
  id: number
): Promise<Relationship[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("relationship")
    .select(
      `id, from_id, to_id, name,
      character!relationship_to_id_fkey(id, name, thumbnail)
      `
    )
    .eq("from_id", id);

  if (error) {
    throw error;
  }

  revalidateTag("relationships");
  return (data as unknown as Relationship[]) || null;
}

export async function createRelationship(
  from_id: number,
  to_id: number,
  name: string
) {
  const supabase = createClient();
  const { data, error } = await supabase.from("relationship").insert([
    {
      from_id,
      to_id,
      name: name || "friend",
    },
  ]);
  if (error) {
    throw error;
  }
  revalidatePath("/u/[slug]/[id]", "page");
  return data;
}

export async function updateRelationship(id: number, name: string) {
  console.log("update", id, name);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("relationship")
    .update({
      name: name || "friend",
    })
    .eq("id", id);
  console.log(data, error);
  if (error) {
    throw error;
  }
  revalidatePath("/u/[slug]/[id]", "page");
  return data;
}

export async function deleteRelationship(id: number) {
  console.log("delete", id);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("relationship")
    .delete()
    .eq("id", id);
  if (error) {
    throw error;
  }
  revalidatePath("/u/[slug]/[id]", "page");
  return data;
}
