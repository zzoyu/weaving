"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchNoticeList(): Promise<
  | {
      id: number;
      type: string;
      title: string;
      created_at: string;
      lang: string;
    }[]
  | null
> {
  const supabase = createClient();

  const { data } = await supabase
    .from("notice")
    .select("id, title, type, created_at, lang")
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .eq("lang", "ko")
    .limit(10);

  return data;
}

export async function fetchNoticeItem(id: number): Promise<{
  id: number;
  type: string;
  title: string;
  content: string;
  created_at: string;
} | null> {
  const supabase = createClient();

  const { data } = await supabase
    .from("notice")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}
