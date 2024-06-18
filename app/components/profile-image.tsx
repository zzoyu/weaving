import Image from "next/image";

export default function ProfileImage({ src }: { src: string }) {
  return (
    <Image
      className="rounded-full"
      src={src}
      width={100}
      height={100}
      alt="프로필 아바타"
      quality={100}
    />
  );
}
