import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center h-full bg-white">
      <header className="fixed top-0 flex h-10 lg:h-14 w-full items-center justify-between px-2 lg:px-8 bg-transparent">
        <Link href="../">
          <button className="p-1 rounded-full h-10 flex items-center justify-center text-3xl  bg-transparent">
            <span className="text-primary-300"><ArrowLeftIcon fill="none" stroke="currentColor" /> 뒤로가기</span>
          </button>
        </Link>
      </header>
      <main className="p-4 lg:p-8 prose mx-auto">{children}</main>
    </div>
  );
}
