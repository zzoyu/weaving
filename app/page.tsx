import Landing from "@/components/landing";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  const client = createClient();
  const { data, error } = await client.auth?.getUser?.();

  // 인증된 사용자이고 리다이렉트 URL이 있는 경우
  if (data?.user?.id && searchParams.redirect) {
    redirect(searchParams.redirect);
  }

  // 인증된 사용자이고 리다이렉트 URL이 없는 경우
  if (data?.user?.id) {
    redirect("/profile");
  }

  return <Landing />;
}
