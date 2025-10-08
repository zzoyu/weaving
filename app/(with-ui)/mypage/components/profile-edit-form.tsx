"use client";

import { uploadImageOnly } from "@/actions/upload-image";
import { updateProfileById } from "@/app/profile/actions";
import { DialogShareButton } from "@/components/interactions/dialog-share-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ImagePath } from "@/types/image";
import { getPngFileName, getPublicUrl } from "@/utils/image";
import { Share2Icon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import UploadImageCropLayer from "../../u/[slug]/add/components/upload-image/upload-image-crop-layer";

export default function ProfileEditForm({ profile }: { profile: Profile }) {
  const [name, setName] = useState(profile.nickname);
  const [bio, setBio] = useState(profile.slug);
  const [avatarUrl, setAvatarUrl] = useState(profile.profile_image);
  const [imageUrl, setImageUrl] = useState(profile.profile_image);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitting(false);
    setIsEditing(false);
  }

  const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${profile.slug}`;

  const [isOpenedCropLayer, setIsOpenedCropLayer] = useState(false);
  const imageFileInput = useRef<HTMLInputElement>(null);

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setImageUrl(profile.profile_image);
      return;
    }
    setImageUrl(URL.createObjectURL(file!));
    setIsOpenedCropLayer(true);
  }

  const { toast } = useToast();

  const imageUploadForm = useRef<HTMLFormElement>(null);

  function handleCropImage(blob: Blob) {
    if (imageFileInput.current) {
      const file = new File(
        [blob],
        `${name}-profile.` + blob.type.split("/")[0],
        {
          type: blob.type,
        }
      );
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      imageFileInput.current.files = dataTransfer.files;
      setAvatarUrl(URL.createObjectURL(blob));
      handleImageUpload();
    }
    setIsOpenedCropLayer(false);
  }

  async function handleImageUpload() {
    try {
      if (!imageFileInput.current?.files?.[0]) {
        toast({
          description: "프로필 이미지를 선택해주세요.",
          variant: "destructive",
        });
        return;
      }

      const finalFileName = getPngFileName(
        imageFileInput.current.files[0].name
      );
      const filePath = `${ImagePath.PROFILE}/${finalFileName}`;

      const url = await uploadImageOnly(
        new FormData(imageUploadForm.current!),
        `${ImagePath.PROFILE}`
      );
      console.log("Uploaded image URL:", getPublicUrl(url));

      if (!url) {
        toast({
          description: "프로필 이미지 업로드에 실패했습니다.",
          variant: "destructive",
        });
        return;
      }
      const updatedProfile = await updateProfileById(profile.id!, {
        profile_image: getPublicUrl(url),
      });
      if (!updatedProfile) {
        toast({
          description: "프로필 이미지 업데이트에 실패했습니다.",
          variant: "destructive",
        });
        return;
      }
      toast({
        description: "프로필 이미지가 변경되었습니다.",
      });
      setAvatarUrl(getPublicUrl(url));
      setIsOpenedCropLayer(false);
      setImageUrl("");
    } catch (error) {
      console.error(error);
      toast({
        description: "프로필 이미지 업로드에 실패했습니다.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4 px-2 rounded-lg">
      {isOpenedCropLayer && (
        <UploadImageCropLayer
          src={imageUrl || ""}
          onCrop={handleCropImage}
          onClose={() => {
            imageFileInput.current!.value = "";
            setIsOpenedCropLayer(false);
            setImageUrl(profile.profile_image);
          }}
        />
      )}
      <form ref={imageUploadForm}>
        <input
          type="file"
          name="image"
          id="image"
          className="hidden"
          ref={imageFileInput}
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleChangeImage}
        />
      </form>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="relative flex flex-col gap-8 justify-center items-center">
          <div className="flex flex-row gap-4 items-center w-full justify-center">
            <div className="relative">
              <Image
                unoptimized
                src={avatarUrl || ""}
                alt="프로필 사진"
                width={96}
                height={96}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col w-full justify-start">
              <h2 className="text-xl py-2 px-4 mb-1">{name}</h2>
              <div className="flex flex-row gap-2 w-full">
                <Button
                  variant="outline"
                  className="text-gray-500 w-1/2 bg-transparent"
                  size="sm"
                >
                  닉네임 변경
                </Button>
                <Button
                  variant="outline"
                  className="text-gray-500 w-1/2 bg-transparent"
                  size="sm"
                  onClick={() => {
                    imageFileInput.current?.click();
                  }}
                >
                  프로필 이미지 변경
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full px-2">
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-white">
                내 우주의 위치
              </label>
              <div className="w-full flex flex-row gap-2 items-center">
                <Input
                  value={profileUrl}
                  readOnly
                  className="w-full bg-transparent"
                />
                <DialogShareButton
                  thumbnailUrl={avatarUrl}
                  templateId={Number(
                    process.env.NEXT_PUBLIC_KAKAO_MESSAGE_TEMPLATE_ID_PROFILE
                  )}
                  extraVariables={{
                    NAME: name,
                  }}
                  targetPath={profileUrl}
                  twitterShareText={`${name} 님의 우주 :: 위빙에서 관찰 중🔍`}
                >
                  <Button type="button">
                    <Share2Icon className="w-4 h-4 fill-white" />
                  </Button>
                </DialogShareButton>
              </div>
              {/* <Button
                variant="outline"
                className="w-full bg-transparent text-gray-500"
                size="sm"
              >
                도메인 변경하기
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
