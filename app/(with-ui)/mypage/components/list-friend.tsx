import Link from "next/link"
import { fetchFriendsByProfileId } from "../actions"
export default async function ListFriend({
  profile,
}:{
  profile: Profile
}) {
  const friends = await fetchFriendsByProfileId(profile.id)

  const friendsProcessed = friends.map((friend) => 
    friend.to_profile_id === profile.id ? friend.from_profile_id : friend.to_profile_id
  )

  return <Link href="/mypage/friend" className="flex flex-col gap-2 justify-center items-center">
    <div>친구</div>
    <div className="text-lg text-gray-500">
      {friendsProcessed.length}
    </div>
  </Link>
}
