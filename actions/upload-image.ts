import { ImagePath } from "@/types/image";
import { getPngFileName, pngBuffer } from "@/utils/image.server";
import { createClient } from "@/utils/supabase/server";
import * as Sentry from "@sentry/nextjs";

// Oracle Object Storage 환경 변수 설정
const OCI_WRITE_URL = process.env.OCI_WRITE_URL;
const OCI_READ_URL = process.env.OCI_READ_URL;

if (!OCI_WRITE_URL || !OCI_READ_URL) {
  const err = new Error(
    "Oracle Object Storage 환경 변수가 설정되지 않았습니다."
  );
  Sentry.captureException(err);
  throw err;
}

export async function uploadImageToObjectStorage(
  file: Buffer,
  fileName: string
): Promise<{ url: string }> {
  try {
    const writeUrl = `${OCI_WRITE_URL}${fileName}`;

    // PUT 요청 보내기
    const response = await fetch(writeUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "image/png",
      },
      body: file,
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error("업로드 실패:", {
        status: response.status,
        statusText: response.statusText,
        url: writeUrl,
        body: responseText,
      });
      const err = new Error(
        `업로드 실패: ${response.statusText} - ${responseText}`
      );
      Sentry.captureException(err);
      throw err;
    }

    // 읽기용 URL 반환
    const readUrl = `${fileName}`;
    return { url: readUrl };
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    Sentry.captureException(error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
}

export async function uploadImage(
  image: File,
  characterId: string,
  imagePath: ImagePath = ImagePath.PROFILE,
  useObjectStorage: boolean = false,
  convertToWebp: boolean = false
) {
  // 이미지 크기가 0이면 빈 문자열 반환
  if (image.size === 0) {
    return "";
  }

  // 이미지를 최적화
  const pngFile = await pngBuffer(Buffer.from(await image.arrayBuffer()));
  const finalFileName = getPngFileName(image.name);
  const fullPath = `${imagePath}/${characterId}_${finalFileName}`;

  if (useObjectStorage) {
    const { url } = await uploadImageToObjectStorage(
      Buffer.from(pngFile),
      fullPath
    );
    return url;
  }

  const supabase = createClient();

  const { data: fileData, error: fileError } = await supabase.storage
    .from("assets")
    .upload(fullPath, pngFile);

  if (fileError) {
    console.error("Supabase 업로드 오류:", fileError);
    Sentry.captureException(fileError);
    throw new Error(fileError.message);
  }

  const { data } = await supabase.storage
    .from("assets")
    .getPublicUrl(fileData.path);

  return data.publicUrl;
}
