"use client";

import { PlusIcon } from "lucide-react";
import Link, { LinkProps } from "next/link";

interface ButtonAddProfileProps extends LinkProps {
};


export default function ButtonAddProfile({ href, ...props }: ButtonAddProfileProps) {
  return (
    <Link className="w-14 h-14 bg-primary rounded-full flex items-center justify-center fixed bottom-20 right-4 z-30" href={href}>
      <PlusIcon className="w-6 h-6" />
    </Link>
  );
}
