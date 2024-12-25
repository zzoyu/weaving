import ProfileImage from "@/app/components/profile-image";

interface ProfileProps {
  metadata: TwitterMetadata;
}

export default function ProfileTwitter({ metadata }: ProfileProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <ProfileImage src={metadata?.avatar_url} />
      <p className="mt-2">{metadata?.name}</p>
      <p className="text-profile-twitter">@{metadata?.user_name}</p>
    </div>
  );
}
