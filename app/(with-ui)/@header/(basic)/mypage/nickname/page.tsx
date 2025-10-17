export const dynamic = "force-dynamic";

import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function Header({}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <header
      className="fixed top-0 flex w-full items-center justify-between py-4 px-2 lg:px-8 bg-transparent"
      key={randomUUID()}
    >
      <Link href="./">
        <button className="p-1 rounded-full h-10 flex items-center justify-center text-2xl  bg-transparent">
          <span className="text-primary-300 flex flex-row items-center gap-1">
            <ArrowLeftIcon fill="none" stroke="currentColor" /> 닉네임 변경
          </span>
        </button>
      </Link>
    </header>
  );
}
