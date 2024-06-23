"use server";

import { Character } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { createClient } from "@/utils/supabase/server";

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
  return data as Relationship[];
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
  return data;
}
