"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchBlogList(
  page = 1,
  limit = 5
): Promise<{
  articles: {
    id: number;
    title: string;
    created_at: string;
  }[];
  totalCount: number;
  totalPages: number;
} | null> {
  const supabase = createClient();

  // 전체 개수 조회
  const { count } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("is_visible", true);

  if (count === null) return null;

  // 페이지네이션된 데이터 조회
  const offset = (page - 1) * limit;
  const { data } = await supabase
    .from("articles")
    .select("id, title, created_at")
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  return {
    articles: data || [],
    totalCount: count,
    totalPages: Math.ceil(count / limit),
  };
}

export async function fetchBlogItem(id: number): Promise<{
  id: number;
  title: string;
  content: string;
  created_at: string;
} | null> {
  const supabase = createClient();

  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}
