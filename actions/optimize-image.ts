import Jimp from "jimp";

export async function optimizeImage(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  quality: number
): Promise<{ buffer: Buffer; fileName: string; mimeType: string }> {
  const image = await Jimp.read(fileBuffer);
  image.quality(quality * 100); // Jimp의 quality는 0~100 사이의 값

  const optimizedBuffer = await image.getBufferAsync(mimeType);
  return {
    buffer: optimizedBuffer,
    fileName,
    mimeType,
  };
}
