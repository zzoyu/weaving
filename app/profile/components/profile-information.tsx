import Image from "next/image";
import Link from "next/link";

export default function ProfileInformation({ profile }: { profile: Profile }) {
  return (
    <div>
      <Link href={"/u/" + profile.slug}>
        <h2>{profile.nickname}</h2>
        <p>{profile.slug}</p>
        {profile.profile_image && (
          <Image
            src={profile.profile_image}
            alt={profile.nickname}
            width={200}
            height={200}
          />
        )}
      </Link>
    </div>
  );
}
