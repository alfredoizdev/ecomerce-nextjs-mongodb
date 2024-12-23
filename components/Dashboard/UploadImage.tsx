"use client";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { MdCloudUpload, MdEdit } from "react-icons/md";
import Image from "next/image";
import { deleteImageAction } from "@/actions/products";
import { useState } from "react";
import { getFolderForCludinary } from "@/utils/cloudinary";

type Props = {
  setImageUrl: (url: string) => void;
  setPubliImageId?: (publicId: string) => void;
  imageUrl?: string | null;
};

export default function UploadImage({
  setImageUrl,
  setPubliImageId,
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
        maxImageHeight: 500,
        maxImageWidth: 500,
        minImageHeight: 300,
        minImageWidth: 300,
        folder: `${getFolderForCludinary()}`,
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

          if (setPubliImageId) {
            setPubliImageId(value.info.public_id);
          }
        }
      }}
      onQueuesEndAction={async () => {
        if (imageUrl) {
          await deleteImageAction(imageUrl);
        }
      }}
    >
      {({ open }) => {
        return (
          <>
            {imageUrl ? (
              <div
                className="relative mb-4 w-[150px] h-[150px] border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
                onClick={() => open()}
                role="button"
              >
                {/* Imagen */}
                <Image
                  src={tempImage || imageUrl}
                  fill
                  sizes="200px"
                  priority
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="Uploaded image"
                />

                {/* Ícono de Edición y Texto */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <MdEdit size={40} className="text-white mb-2" />
                  <span className="text-sm font-semibold text-white">
                    Edit Image
                  </span>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <MdCloudUpload size={40} className="text-white mb-2" />
                  <span className="text-sm font-semibold text-white">
                    Upload Image
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="mb-4 w-[150px] h-[150px] border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
                onClick={() => open()}
                role="button"
              >
                <div className="flex justify-center items-center w-full h-full">
                  <MdCloudUpload size={100} className="text-gray-900 mb-2" />
                </div>

                {/* Ícono de Edición y Texto */}
              </div>
            )}
          </>
        );
      }}
    </CldUploadWidget>
  );
}
