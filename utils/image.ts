export function getPublicUrl(fileName?: string): string {
  const OCI_READ_URL = process.env.NEXT_PUBLIC_OCI_READ_URL;
  // 파일 이름이 없으면 빈 문자열 반환
  if (!fileName || fileName.trim() === "") {
    return "";
  }

  // 파일이 Blob인 경우
  if (fileName.startsWith("blob:")) {
    return fileName;
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
