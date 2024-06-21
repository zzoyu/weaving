import { ImagePath } from "@/types/image";
import { createClient } from "@/utils/supabase/server";

export async function uploadImage(
  image: File,
  fileName: string,
  imagePath: ImagePath = ImagePath.PROFILE
) {
  const supabase = createClient();

  console.log(imagePath, fileName, image);

  console.log(`${imagePath}/${fileName}_${new Date().getTime()}`);

  if (image.size > 0) {
    const { data: fileData, error: fileError } = await supabase.storage
      .from("assets")
      .upload(`${imagePath}/${fileName}_${new Date().getTime()}`, image);

    if (fileError) {
      throw new Error(fileError.message);
    }
    const { data } = await supabase.storage
      .from("assets")
      .getPublicUrl(fileData.path);

    return data.publicUrl;
  }
}
