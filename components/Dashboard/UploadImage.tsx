"use client";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Button } from "../ui/button";
import { MdCloudUpload } from "react-icons/md";

type Props = {
  setImageUrl: (url: string) => void;
};

export default function UploadImage({ setImageUrl }: Props) {
  return (
    <CldUploadWidget
      uploadPreset="myshop-next"
      onSuccess={(value: CloudinaryUploadWidgetResults) => {
        if (
          value.info &&
          typeof value.info !== "string" &&
          value.info.secure_url
        ) {
          const imageUrl = value.info.secure_url;
          setImageUrl(imageUrl);
        }
      }}
    >
      {({ open }) => {
        return (
          <Button
            className="mb-4"
            variant={"destructive"}
            onClick={() => open()}
          >
            <MdCloudUpload size={25} />
            Upload an Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
