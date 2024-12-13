export function TabHeader() {
  return (
    <div className="flex items-center space-x-0 w-full px-8">
      <button className="font-bold text-black border-b-4 border-black w-full">
        프로필 목록
      </button>
      <button className="text-gray-400 border-b-4 border-gray-400 w-full">
        프로필 추가
      </button>
    </div>
  );
}
