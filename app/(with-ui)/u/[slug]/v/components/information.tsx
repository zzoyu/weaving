import ProfileImage from "@/app/(with-ui)/@header/components/profile-image";

interface InformationProps {
  profile: Profile;
  isEditable?: boolean;
}

export default function Information({ profile, isEditable }: InformationProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl mb-5">{profile.nickname}</h1>

      {profile.profile_image && (
        <ProfileImage
          src={profile.profile_image}
          isEditable={isEditable}
          slug={profile.slug}
        />
      )}
      <p className="text-profile-twitter">weaving@{profile?.slug}</p>
    </div>
  );
}
