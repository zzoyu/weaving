"use server";

export async function generateOgImage(
  name: string,
  description: string,
  thumbnail: string
) {
  const imageUrl = new URL(
    `/api/og?name=${encodeURIComponent(name)}&description=${encodeURIComponent(
      description
    )}&thumbnail=${encodeURIComponent(thumbnail)}`,
    process.env.NEXT_PUBLIC_BASE_URL
  );

  const image = await fetch(imageUrl);
  return image;
}
