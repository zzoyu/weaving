import sharp from 'sharp';

/**
 * 이미지를 WebP로 변환하는 함수
 * @param file File 객체
 * @returns WebP 버퍼와 파일명을 포함한 객체
 */
export async function convertToWebP(file: File): Promise<{
  buffer: Buffer;
  fileName: string;
}> {
  // 파일명 정리
  const timestamp = new Date().getTime();
  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9가-힣-_]/g, '_').toLowerCase();
  const fileName = `${sanitizedFileName}_${timestamp}.webp`;

  // 이미지를 WebP로 변환
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const webpBuffer = await sharp(buffer)
    .webp({ quality: 80 })
    .toBuffer();

  return {
    buffer: webpBuffer,
    fileName
  };
}

/**
 * 이미지를 WebP File 객체로 변환하는 함수
 * @param file File 객체
 * @returns WebP File 객체와 파일명을 포함한 객체
 */
export async function convertToWebPFile(file: File): Promise<{
  file: File;
  fileName: string;
}> {
  const { buffer, fileName } = await convertToWebP(file);

  // WebP로 변환된 이미지로 File 객체 생성
  const webpFile = new File([buffer], fileName, {
    type: 'image/webp',
    lastModified: file.lastModified
  });

  return {
    file: webpFile,
    fileName
  };
} 