import Link from "next/link"
export default function ListFriend({
  friends,
}:{
  friends: Friend[]
}) {

  return <Link href="/mypage/friend" className="flex flex-row gap-2 justify-center items-center">
    <span className="text-sm">친구</span>
    <div className="text-lg text-gray-500">
      {friends.length}
    </div>
  </Link>
}
