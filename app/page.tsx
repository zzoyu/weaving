import { createClient } from "@/utils/supabase/server";
import MainMenu from "./components/main-menu";
import LogoColored from "@/public/assets/logos/logo_color.svg";
import { redirect } from "next/navigation";

export default async function Home() {
  const client = createClient();
  const { data, error } = await client.auth?.getUser?.();
  if (data?.user?.id) redirect("/profile");

  return (
    <main className="h-full flex flex-col items-center">
      <div className="h-1/2 w-1/3 max-w-48 flex flex-col items-center justify-center gap-2">
        <LogoColored></LogoColored>
        <h1 className="font-thin font-poiret-one">Welcome!</h1>
      </div>

      <MainMenu />
    </main>
  );
}
