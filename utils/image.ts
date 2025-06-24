import { webpBuffer } from "./image.server";

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
  const sanitizedFileName = file.name
    .replace(/[^a-zA-Z0-9가-힣-_]/g, "_")
    .toLowerCase();
  const fileName = `${sanitizedFileName}_${timestamp}.webp`;

  // 이미지를 WebP로 변환
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const webpBufferData = await webpBuffer(buffer);

  return {
    buffer: webpBufferData,
    fileName,
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
  const uint8Array = new Uint8Array(buffer);
  const webpFile = new File([uint8Array], fileName, {
    type: "image/webp",
    lastModified: file.lastModified,
  });

  return {
    file: webpFile,
    fileName,
  };
}

export function getPublicUrl(fileName: string = ""): string {
  const OCI_READ_URL = process.env.NEXT_PUBLIC_OCI_READ_URL || "";
  // 파일 이름이 없으면 빈 문자열 반환
  if (!fileName || fileName.trim() === "") {
    return "";
  }

  // 파일 이름이 절대경로 시작하면 그대로 반환
  if (fileName.startsWith("http://") || fileName.startsWith("https://")) {
    return fileName;
  }

  // 파일 이름이 '/'로 시작하면 제거 후 url 생성
  if (fileName.startsWith("/")) {
    fileName = fileName.slice(1);
    return OCI_READ_URL + fileName;
  }

  // 파일 이름이 '/'로 시작하지 않으면 바로 url 생성
  return OCI_READ_URL + fileName;
}
