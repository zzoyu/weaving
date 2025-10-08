import { fetchProfileByUserId } from "@/app/profile/actions";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchFriendsByProfileId, fetchProfilesByIds } from "../actions";

export default async function FriendPage() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const profile = await fetchProfileByUserId(user?.data?.user?.id as string);

  if (!profile) {
    redirect("/");
  }

  const friends = await fetchFriendsByProfileId(profile?.id);

  const friendsProcessed = friends.map((friend) =>
    friend.to_profile_id === profile?.id
      ? friend.from_profile_id
      : friend.to_profile_id
  );

  const friendsProfiles = await fetchProfilesByIds(friendsProcessed);

  return (
    <main className="flex flex-col items-center justify-start w-full h-full pt-10">
      <section className="w-full h-full max-w-md p-4 bg-white rounded">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-8">친구</h2>
          <div className="flex flex-col gap-2">
            {friendsProfiles.map((friend) => (
              <div key={friend.id}>
                <Link
                  href={`/u/${friend.slug}`}
                  className="flex flex-row items-center gap-4"
                >
                  <Image
                    unoptimized
                    src={friend.profile_image}
                    alt={friend.nickname}
                    width={100}
                    height={100}
                  />
                  <div className="text-lg text-gray-500 font-bold">
                    {friend.nickname}
                  </div>
                </Link>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
