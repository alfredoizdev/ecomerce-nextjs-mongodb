"use client";
import { toast } from "sonner";
import { uploadUserAvatar } from "@/actions/users";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { getFolderForCludinary } from "@/utils/cloudinary";

type Props = {
  avatar?: string;
  id?: string;
};

const UploadAvatar = ({ avatar, id }: Props) => {
  if (!id) {
    return null;
  }

  const handleUpload = async (value: CloudinaryUploadWidgetResults) => {
    if (value.info && typeof value.info !== "string" && value.info.secure_url) {
      const { success } = await uploadUserAvatar(id, value.info.secure_url);

      if (success) {
        toast.success("Avatar uploaded successfully");
      } else {
        toast.error("An error occurred while uploading the avatar");
      }
    }
  };

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
        folder: `${getFolderForCludinary()}/avatars`,
      }}
      onSuccess={handleUpload}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open()}
            className="relative mb-4 w-[300px] h-[300px] border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
          >
            <Image
              className="rounded-md"
              width={300}
              height={300}
              src={avatar || "/images/not-profile-image.webp"}
              alt="User avatar"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <MdEdit size={40} className="text-white mb-2" />
              <span className="text-sm font-semibold text-white">
                Edit Avatar
              </span>
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadAvatar;
