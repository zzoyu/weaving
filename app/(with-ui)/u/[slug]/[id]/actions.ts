"use server";

import { Character } from "@/types/character";
import { Relationship, RelationshipNode } from "@/types/relationship";
import { buildRelationshipTree } from "@/utils/relationship";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function fetchCharacter(id: number): Promise<Character | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("character")
    .select()
    .eq("id", Number(id))
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

export async function fetchRelationshipsWithDepth(
  id: number
): Promise<RelationshipNode[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("relationship_with_depth", {
    start_id: id,
    max_depth: 3,
  });

  if (error) {
    console.error(error?.message);
    throw error;
  }

  // 데이터를 트리 구조로 변환
  const treeData = buildRelationshipTree(id, data);

  revalidateTag("relationships");
  return treeData;
}

export async function fetchRelationshipsWithDepthExtended(
  id: number
): Promise<RelationshipNode[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc(
    "relationship_with_depth_extended",
    {
      start_id: id,
      max_depth: 3,
    }
  );

  if (error) {
    console.error(error?.message);
    throw error;
  }
  console.log("fetchRelationshipsWithDepthExtended", data);
  // 데이터를 트리 구조로 변환
  const treeData = buildRelationshipTree(id, data);

  revalidateTag("relationships");
  return treeData;
}

export async function createBulkRelationships(
  from_id: number,
  relationships: {
    to_id: number;
    name: string;
  }[]
) {
  console.log("createBulkRelationships", from_id, relationships);
  const supabase = createClient();
  const { data, error } = await supabase.from("relationship").insert(
    relationships.map((relationship) => ({
      from_id,
      to_id: relationship.to_id,
      name: relationship.name || "friend",
    }))
  );
  if (error) {
    throw error;
  }
  revalidatePath("/u/[slug]", "page");
  return data;
}

export async function createRelationship(
  from_id: number,
  to_id: number,
  name: string
) {
  const supabase = createClient();
  const { data, error } = await supabase.from("relationship").insert({
    from_id,
    to_id,
    name: name || "friend",
  });
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

export async function fetchIsFavoriteById(
  profile_id?: number,
  character_id?: number
): Promise<boolean> {
  if (!profile_id || !character_id) return false;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("character_favorite")
    .select()
    .eq("profile_id", profile_id)
    .eq("character_id", character_id)
    .single();
  if (error) {
    return false;
  }

  // if data exists, it means it's favorited. if not, it's not favorited.

  return !!data;
}

export async function updateCharacterPassword(
  character_id: number,
  password: string
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("character")
    .update({ password })
    .eq("id", character_id);
  if (error) {
    throw error;
  }
  revalidatePath("/u/[slug]/[id]", "page");
  return data;
}

export async function compareCharacterPassword(
  character_id: number,
  password?: string
) {
  if (!password) {
    return false;
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("character")
    .select()
    .eq("id", character_id)
    .eq("password", password)
    .single();
  if (error) {
    return false;
  }

  return !!data;
}
