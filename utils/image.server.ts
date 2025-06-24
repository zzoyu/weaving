import sharp from "sharp";

export const webpBuffer = async (buffer: Buffer) => {
  return await sharp(buffer).webp({ quality: 80 }).toBuffer();
};