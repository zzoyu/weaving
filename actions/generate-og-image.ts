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

  try {
    const image = await fetch(imageUrl);
    return image;
  } catch (error) {
    console.error("Error generating OG image:", error);
    return null;
  }
}
