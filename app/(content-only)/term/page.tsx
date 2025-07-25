import Link from "next/link";

export default function Term() {
  return (
    <div className="flex flex-col justify-center h-full bg-white">
      <header className="fixed top-0 flex h-10 md:h-14 w-full items-center justify-between px-2 md:px-8 bg-transparent">
        <Link href="../">
          <button className="p-1 rounded-full h-10 flex items-center justify-center text-3xl  bg-transparent">
            <span className="text-primary-300">← 뒤로가기</span>
          </button>
        </Link>
      </header>
      <iframe
        className="w-full h-full"
        src="https://findingbenjamin.notion.site/ebd/977ff70e969b4543b1c38128650f267e"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
