import { createClient } from "@/utils/supabase/server";
import { MetadataRoute } from "next";

async function getSlugs() {
  const supabase = createClient();
  const { data, error } = await supabase.from("profile").select("slug");
  if (error) {
    console.error(error);
    return [];
  }
  return data.map((character) => character.slug);
}

async function getIdsAndSlugs() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("character")
    .select("id, profile_id, profile:profile_id(slug)");
  if (error) {
    console.error(error);
    return [];
  }
  return data.map((data) => {
    const profileSlug = data.profile?.[0]?.slug ?? "";
    return {
      id: data.id,
      slug: profileSlug,
    };
  });
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getSlugs();
  const idsAndSlugs = await getIdsAndSlugs();

  // 정적 경로
  const staticRoutes = [
    "/",
    "/about",
    "/guideline",
    "/privacy",
    "/term",
    "/mypage",
    "/notifications",
  ];

  // 동적 경로 예시
  const dynamicRoutes = [
    ...slugs.map((slug) => ({
      url: `${baseUrl}/u/${slug}`,
      lastModified: new Date(),
    })),
    ...idsAndSlugs.map(({ id, slug }) => ({
      url: `${baseUrl}/u/${slug}/${id}`,
      lastModified: new Date(),
    })),
  ];

  // 정적 경로 객체로 변환
  const staticRouteObjects = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticRouteObjects, ...dynamicRoutes];
}
