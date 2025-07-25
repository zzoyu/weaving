"use client";

import { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface UploadImageCropLayerProps {
  src: string;
  onCrop: (blob: Blob) => void;
  onClose: () => void;
}

export default function UploadImageCropLayer({
  src,
  onCrop,
  onClose,
}: UploadImageCropLayerProps) {
  async function handleSave() {
    try {
      if (!imageRef.current) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imageRef.current;
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        img,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob(
        (blob) => {
          if (blob) onCrop(blob);
        },
        "image/jpeg",
        1
      );
    } catch (error) {
      console.error(error);
    }
  }

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current;
      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const containerWidth = window.innerWidth * 0.8;
        const containerHeight = window.innerHeight * 0.8;
        const containerAspectRatio = containerWidth / containerHeight;

        if (aspectRatio > containerAspectRatio) {
          img.style.width = `${containerWidth}px`;
          img.style.height = "auto";
        } else {
          img.style.width = "auto";
          img.style.height = `${containerHeight}px`;
        }
      };
    }
  }, [src]);

  const [crop, setCrop] = useState<Crop>({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 200,
    height: 200,
  });

  return (
    <div className="fixed z-50 inset-0 w-full h-full flex flex-col items-center justify-center gap-10 bg-background-default">
      <small
        className="
      border-2 border-primary rounded-lg p-1
      fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      bg-background-default z-10
      opacity-80
      "
      >
        썸네일로 사용할 영역을 선택해주세요.
      </small>
      <div>
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          keepSelection
          circularCrop
          aspect={1}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-fit h-fit object-contain rounded-lg"
            src={src}
            alt="이미지"
            ref={imageRef}
          />
        </ReactCrop>
      </div>
      <div className="flex flex-row gap-2 fixed bottom-16 justify-stretch md:justify-center w-full md:w-auto md:bottom-24 left-1/2 transform -translate-x-1/2 px-4">
        <button
          type="button"
          onClick={handleSave}
          className="bg-primary hover:bg-primary hover:opacity-90 text-text-black px-10 py-4 rounded-lg w-full md:w-auto"
        >
          저장
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-background-dark hover:bg-background-dark hover:opacity-90 text-primary-200 px-10 py-4 rounded-lg w-full md:w-auto"
        >
          취소
        </button>
      </div>
    </div>
  );
}
