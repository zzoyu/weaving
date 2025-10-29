// Allow-list for external thumbnail domains
const ALLOWED_THUMBNAIL_HOSTS = [
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_OCI_READ_URL,
  process.env.NEXT_PUBLIC_BASE_URL,
]
  .filter(Boolean)
  .map((entry) => {
    try {
      // If entry is a full URL, extract hostname; else, use as-is
      return new URL(entry || "").hostname;
    } catch {
      return entry;
    }
  });

export function isAllowedExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_THUMBNAIL_HOSTS.some((host) =>
      host?.includes(parsed.hostname)
    );
  } catch (e) {
    return false;
  }
}

export function getPublicUrl(fileName?: string): string {
  const OCI_READ_URL = process.env.NEXT_PUBLIC_OCI_READ_URL;
  // 파일 이름이 없으면 빈 문자열 반환
  if (!fileName || fileName.trim() === "") {
    return "";
  }

  // 파일이 Blob인 경우
  // Allow blob: URLs, but block dangerous code schemes
  if (fileName.trim().toLowerCase().startsWith("blob:")) {
    // Validate that blob: URL matches expected format "blob:<origin>/<uuid>"
    // Typical blob: URL: blob:http(s)://origin/id
    const blobUrlRegex = /^blob:(https?:\/\/)?[\w\-\.:]+\/[a-fA-F0-9\-]+$/;
    if (blobUrlRegex.test(fileName.trim())) {
      return fileName;
    } else {
      return "";
    }
  }
  // Block dangerous schemes: data:, javascript:, vbscript:
  const lowered = fileName.trim().toLowerCase();
  if (
    lowered.startsWith("data:") ||
    lowered.startsWith("javascript:") ||
    lowered.startsWith("vbscript:")
  ) {
    return "";
  }

  // 파일 이름이 절대경로 시작하면 그대로 반환
  if (fileName.startsWith("http:") || fileName.startsWith("https:")) {
    // Optionally reject unapproved external URLs at this level too
    try {
      const parsed = new URL(fileName);
      if (!isAllowedExternalUrl(fileName)) {
        return ""; // Block/return blank for untrusted host
      }
    } catch {
      return "";
    }
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

/**
 * 파일명을 PNG로 변환된 이름으로 반환하는 유틸
 */
export function getPngFileName(originalName: string): string {
  const timestamp = new Date().getTime();
  const sanitizedFileName = originalName
    .replace(/[^a-zA-Z0-9가-힣-_]/g, "_")
    .toLowerCase();
  return `${sanitizedFileName}_${timestamp}.png`;
}
