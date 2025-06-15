import LogoColor from "@/public/assets/logos/logo_text_horizontal_color.svg";
import LogoWhite from "@/public/assets/logos/logo_text_horizontal_color_white.svg";

export default function Logo() {
  return (
    <span className="inline-block relative h-[30px]">
      <span className="block dark:hidden">
        <LogoColor height={30} />
      </span>
      <span className="hidden dark:block">
        <LogoWhite height={30} />
      </span>
    </span>
  );
} 