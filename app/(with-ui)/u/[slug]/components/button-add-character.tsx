import Link from "next/link";

export default function ButtonAddCharacter({ slug }: { slug: string }) {
  return <Link href={`/u/${slug}/add`}>캐릭터 추가</Link>;
}
