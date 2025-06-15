"use client";

export default function ButtonProfileLink({ children }: { children: string }) {
  function handleClick() {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/u/${children}`
    );
  }
  return (
    <div className="relative flex flex-col items-center">
      <button className="text-center text-gray-500" onClick={handleClick}>
        {process.env.NEXT_PUBLIC_URL}/u/{children}
      </button>
      {/* <span
        className="absolute top-full p-1 rounded duration-200 
ease-out transition transform origin-top-right bg-white text-black bg-opacity-50"
      >
        복사되었어요!
      </span> */}
    </div>
  );
}
