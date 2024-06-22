"use client";

import Image from "next/image";

import ImageIcon from "@/public/assets/icons/image.svg";
import { useRef, useState } from "react";
import UploadImageCropLayer from "./upload-image-crop-layer";

export default function UploadImage({}) {
  const imageFileInput = useRef<HTMLInputElement>(null);
  const thumbnailFileInput = useRef<HTMLInputElement>(null);
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string>("");
  const [isOpenedCropLayer, setIsOpenedCropLayer] = useState<boolean>(false);

  function handlePickImage() {
    imageFileInput.current?.click();
  }
  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event);
    const file = event.target.files?.[0];
    if (!file) return;
    setIsOpenedCropLayer(true);
    setImagePreviewSrc(URL.createObjectURL(file!));
  }

  return (
    <div className="relative">
      <button
        className=" w-60 h-60 flex justify-center items-center bg-gray-200 dark:bg-gray-800 rounded-lg"
        onClick={handlePickImage}
        type="button"
      >
        <input
          type="file"
          // except only image files without gif file
          accept="image/jpeg, image/jpg, image/png"
          name="image"
          className="hidden"
          ref={imageFileInput}
          onChange={handleChangeImage}
        />
        <input
          type="file"
          name="thumbnail"
          className="hidden"
          ref={thumbnailFileInput}
        />
        {imagePreviewSrc && !isOpenedCropLayer ? (
          <Image
            width={240}
            height={240}
            alt={"캐릭터 이미지"}
            src={imagePreviewSrc}
          />
        ) : (
          <ImageIcon width={32} height={32} />
        )}
      </button>
      {isOpenedCropLayer && (
        <UploadImageCropLayer
          src={imagePreviewSrc}
          onCrop={(blob) => {
            console.log(blob);
            const file = new File(
              [blob],
              "thumbnail." + blob.type.split("/")[0],
              {
                type: blob.type,
              }
            );
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            thumbnailFileInput.current!.files = dataTransfer.files;
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
