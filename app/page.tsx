import Link from "next/link";
import MainMenu from "./components/main-menu";
import LogoColored from "@/public/assets/logos/logo_color.svg";

export default async function Home() {
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
