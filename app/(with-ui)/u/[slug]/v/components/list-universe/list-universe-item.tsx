"use client";

import { Universe } from "@/types/universe";
import { getPublicUrl } from "@/utils/image";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function ListUniverseItem({
  universe,
  slug,
  isMine = false,
}: {
  universe: Universe;
  slug: string;
  isMine?: boolean;
}) {
  return (
    <Link href={`/u/${slug}/v/${universe.id}`}>
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-1 overflow-hidden rounded-md relative group focus-within:ring-2"
        )}
      >
        <div className="w-full aspect-[16/9] relative">
          <Image
            unoptimized
            src={
              getPublicUrl(universe.thumbnail || universe?.image?.[0]) ||
              `/assets/images/og/with-logo.webp`
            }
            alt={universe.name}
            fill
            className="object-cover rounded-md"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center py-2 px-2 text-base lg:text-lg truncate">
            {universe.name}
          </div>
        </div>
      </div>
    </Link>
  );
}
