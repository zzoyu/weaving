import LogoColor from "@/public/assets/logos/logo_text_horizontal_color_beta.svg";
import LogoWhite from "@/public/assets/logos/logo_text_horizontal_white_beta.svg";

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
