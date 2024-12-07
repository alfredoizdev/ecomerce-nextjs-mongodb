"use client";

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { MdCloudUpload, MdEdit } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";

type Props = {
  setImageUrl: (url: string) => void;
  imageUrl?: string | null;
};

export default function UploadHeroBanner({
  setImageUrl,
  imageUrl = null,
}: Props) {
  const [tempImage, setTempImage] = useState("");

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      options={{
        sources: ["local"],
        multiple: false,
        maxFiles: 1,
        maxFileSize: 10000000,
        maxImageHeight: 1000,
        maxImageWidth: 2000,
        minImageHeight: 500,
        minImageWidth: 1000,
      }}
      onSuccess={(value: CloudinaryUploadWidgetResults) => {
        if (
          value.info &&
          typeof value.info !== "string" &&
          value.info.secure_url
        ) {
          const imageUrl = value.info.secure_url;
          setImageUrl(imageUrl);
          setTempImage(imageUrl);
        }
      }}
    >
      {({ open }) => {
        return (
          <div
            className="relative mb-4 w-full h-[300px] border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
            onClick={() => open()}
            role="button"
          >
            {/* Imagen */}
            <Image
              src={imageUrl || tempImage || "/images/shoes/red/red-banner.webp"}
              fill
              sizes="600px"
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Hero Banner"
            />

            {/* Ícono de Edición */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {imageUrl ? (
                <>
                  <MdEdit size={40} className="text-white mb-2" />
                  <span className="text-sm font-semibold text-white">
                    Edit Image
                  </span>
                </>
              ) : (
                <>
                  <MdCloudUpload size={40} className="text-white mb-2" />
                  <span className="text-sm font-semibold text-white">
                    Upload Image
                  </span>
                </>
              )}
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
