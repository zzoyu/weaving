import LogoColored from "@/public/assets/logos/logo_color.svg";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MainMenu from "./components/main-menu";

export default async function Home() {
  const client = createClient();
  const { data, error } = await client.auth?.getUser?.();
  if (data?.user?.id) redirect("/profile");

  return (
    <main className="h-full flex flex-col items-center">
      <div className="h-1/2 w-1/3 max-w-48 flex flex-col items-center justify-center gap-2">
        <LogoColored></LogoColored>
      </div>

      <MainMenu />
    </main>
  );
}
