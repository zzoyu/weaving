"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function setCharacterPassword(formData: FormData): Promise<void> {
  const password = formData.get("password") as string;
  const characterId = formData.get("character_id") as string;
  if (!password) throw new Error("Password is required");
  if (!characterId) throw new Error("Character ID is required");

  const supabase = createClient();
  const { error } = await supabase
    .from("character")
    .update({ password })
    .eq("id", characterId);

  if (error) {
    throw new Error(`Failed to set password: ${error.message}`);
  }

  revalidatePath("/u/[slug]/[id]", "layout"); // Revalidate the path to update the UI
}

export async function clearCharacterPassword(
  formData: FormData
): Promise<void> {
  const characterId = formData.get("character_id") as string;
  if (!characterId) throw new Error("Character ID is required");

  const supabase = createClient();

  const { error } = await supabase
    .from("character")
    .update({ password: "" })
    .eq("id", characterId);

  if (error) {
    throw new Error(`Failed to clear password: ${error.message}`);
  }

  revalidatePath("/u/[slug]/[id]", "layout"); // Revalidate the path to update the UI
}

export async function deleteCharacterById(id: number) {
  if (!id) throw new Error("Character ID is required");
  const supabase = createClient();

  const { data, error } = await supabase
    .from("character")
    .delete()
    .eq("id", id);

  if (!error) return true;
  else throw new Error(`Failed to delete character: ${error.message}`);
}
