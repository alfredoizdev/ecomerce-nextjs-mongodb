"use client";
import { IoMdAdd } from "react-icons/io";
import { customRevalidatePath } from "@/actions/media";
import { toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";
import { getFolderForCludinary } from "@/utils/cloudinary";

const UploadFloat = () => {
  return (
    <>
      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        options={{
          sources: ["local"],
          resourceType: "image",
          multiple: false,
          cropping: true,
          maxFiles: 1,
          maxFileSize: 10000000,
          maxImageHeight: 1000,
          maxImageWidth: 2000,
          minImageHeight: 500,
          minImageWidth: 500,
          folder: `${getFolderForCludinary()}`, // Ensure folder is set
        }}
        onSuccess={() => {
          customRevalidatePath("/admin/media");
          toast.success("Image uploaded successfully");
        }}
      >
        {({ open }) => {
          return (
            <button
              onClick={() => open()}
              className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white rounded-full shadow-lg p-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <IoMdAdd size={24} />
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadFloat;
