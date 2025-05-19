"use client";

import Image from "next/image";

import ImageIcon from "@/public/assets/icons/image.svg";
import { useRef, useState } from "react";
import UploadImageCropLayer from "./upload-image-crop-layer";

export default function UploadImage({
  name,
  useThumbnail,
  icon,
  imageUrl,
  thumbnailUrl,
  isEdit = false,
}: {
  name: string;
  isEdit?: boolean;
  useThumbnail?: boolean;
  icon?: JSX.Element;
  imageUrl?: string;
  thumbnailUrl?: string;
}) {
  const imageFileInput = useRef<HTMLInputElement>(null);
  const thumbnailFileInput = useRef<HTMLInputElement>(null);
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string>(
    imageUrl || ""
  );
  const [isOpenedCropLayer, setIsOpenedCropLayer] = useState<boolean>(false);

  const [isEdited, setIsEdited] = useState<boolean>(false);

  function handlePickImage() {
    imageFileInput.current?.click();
  }
  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event);
    const file = event.target.files?.[0];
    if (!file) return;
    setImagePreviewSrc(URL.createObjectURL(file!));
    setIsEdited(true);
    if (useThumbnail) {
      setIsOpenedCropLayer(true);
    } else {
      // Directly handle the file without opening the crop layer
      if (thumbnailFileInput.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        thumbnailFileInput.current.files = dataTransfer.files;
      }
    }
  }

  return (
    <div className="relative">
      <input
        type="hidden"
        name={`${name}-is-edited`}
        value={isEdited ? "true" : "false"}
      />
      {isEdited && isEdit && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm z-10">
          *
        </div>
      )}
      <button
        className=" w-60 h-60 flex justify-center items-center bg-gray-200 dark:bg-gray-800 rounded-lg"
        onClick={handlePickImage}
        type="button"
      >
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          name={`${name}-image`}
          className="hidden"
          ref={imageFileInput}
          onChange={handleChangeImage}
        />
        {useThumbnail && (
          <input
            type="file"
            name={`${name}-thumbnail`}
            className="hidden"
            ref={thumbnailFileInput}
          />
        )}
        {imagePreviewSrc && !isOpenedCropLayer ? (
          <div className="relative w-full h-full">
            <Image
              className="object-contain w-full h-full overflow-hidden"
              alt={"캐릭터 이미지"}
              src={imagePreviewSrc}
              layout="fill"
            />
            {useThumbnail &&
              (thumbnailFileInput.current?.files?.[0] || thumbnailUrl) && (
                <div className="absolute z-30 -bottom-2 -right-2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    className="object-cover w-full h-full"
                    alt={"썸네일 이미지"}
                    src={
                      thumbnailFileInput.current?.files?.[0]
                        ? URL.createObjectURL(
                            thumbnailFileInput.current.files[0]
                          )
                        : thumbnailUrl!
                    }
                    layout="fill"
                  />
                </div>
              )}
          </div>
        ) : icon ? (
          icon
        ) : (
          <ImageIcon width={32} height={32} />
        )}
      </button>
      {isOpenedCropLayer && (
        <UploadImageCropLayer
          src={imagePreviewSrc}
          onCrop={(blob) => {
            console.log(blob);
            if (useThumbnail && thumbnailFileInput.current) {
              const file = new File(
                [blob],
                `${name}-thumbnail.` + blob.type.split("/")[0],
                {
                  type: blob.type,
                }
              );
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(file);
              thumbnailFileInput.current.files = dataTransfer.files;
            }
            setIsOpenedCropLayer(false);
          }}
          onClose={() => {
            imageFileInput.current!.value = "";
            setImagePreviewSrc("");
            setIsOpenedCropLayer(false);
          }}
        />
      )}
    </div>
  );
}
