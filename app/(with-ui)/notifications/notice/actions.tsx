"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchNoticeList(
  page = 1,
  limit = 5
): Promise<{
  notices: {
    id: number;
    type: string;
    title: string;
    created_at: string;
    lang: string;
  }[];
  totalCount: number;
  totalPages: number;
} | null> {
  const supabase = createClient();

  // 전체 개수 조회
  const { count } = await supabase
    .from("notice")
    .select("*", { count: "exact", head: true })
    .eq("is_visible", true)
    .eq("lang", "ko");

  if (count === null) return null;

  // 페이지네이션된 데이터 조회
  const offset = (page - 1) * limit;
  const { data } = await supabase
    .from("notice")
    .select("id, title, type, created_at, lang")
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .eq("lang", "ko")
    .range(offset, offset + limit - 1);

  return {
    notices: data || [],
    totalCount: count,
    totalPages: Math.ceil(count / limit),
  };
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
