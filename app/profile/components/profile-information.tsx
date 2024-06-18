export default function ProfileInformation({ profile }: { profile: Profile }) {
  return (
    <div>
      <h2>{profile.nickname}</h2>
      <p>{profile.slug}</p>
      <img src={profile.profile_image} alt={profile.nickname} />
    </div>
  );
}
