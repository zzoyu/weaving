import sharp from "sharp";

/**
 * 버퍼를 WebP로 변환하는 함수 (서버 전용)
 */
export async function webpBuffer(buffer: Buffer): Promise<Buffer> {
  return await sharp(buffer).webp({ quality: 80 }).toBuffer();
}

/**
 * 파일명을 WebP로 변환된 이름으로 반환하는 유틸
 */
export function getWebPFileName(originalName: string): string {
  const timestamp = new Date().getTime();
  const sanitizedFileName = originalName
    .replace(/[^a-zA-Z0-9가-힣-_]/g, "_")
    .toLowerCase();
  return `${sanitizedFileName}_${timestamp}.webp`;
}