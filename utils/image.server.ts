"use server";

import sharp from "sharp";

/**
 * 버퍼를 png으로 변환하는 함수 (서버 전용)
 */
export async function pngBuffer(buffer: Buffer): Promise<Buffer> {
  return await sharp(buffer).png({ quality: 80 }).toBuffer();
}

/**
 * 버퍼를 WebP로 변환하는 함수 (서버 전용)
 */
export async function webpBuffer(buffer: Buffer): Promise<Buffer> {
  return await sharp(buffer).webp({ quality: 80 }).toBuffer();
}
