import { customRevalidatePath } from "@/actions/media";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

type Props = {
  folders?: string[];
  toogle: () => void;
};

const FolderPopup = ({
  folders = ["user", "banner", "product"],
  toogle,
}: Props) => {
  const [folder, setFolder] = useState("");
  const onSelectFolder = (folder: string) => {
    const folderPath = process.env.NEXT_PUBLIC_FOLDER_CLOUDINARY
      ? `${process.env.NEXT_PUBLIC_FOLDER_CLOUDINARY}/${folder}`
      : `dev/${folder}`;

    setFolder(folderPath);
  };

  return (
    <>
      <div
        style={{
          right: "90px",
        }}
        className="absolute bottom-6 bg-white shadow-lg rounded-lg p-4 w-48 z-50 border"
      >
        <ul className="space-y-2">
          {folders.map((folder, index) => (
            <li key={index}>
              <button
                onClick={() => onSelectFolder(folder)}
                className="w-full text-left px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition"
              >
                {folder}
              </button>
            </li>
          ))}
        </ul>
        <div className="my-2">
          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            options={{
              sources: ["local"],
              multiple: false,
              cropping: true,
              maxFiles: 1,
              maxFileSize: 10000000,
              maxImageHeight: 1000,
              maxImageWidth: 2000,
              minImageHeight: 500,
              minImageWidth: 500,
              folder: `${process.env.NEXT_PUBLIC_FOLDER_CLOUDINARY}/${folder}`,
            }}
            onSuccess={() => {
              toogle();
              customRevalidatePath("admin/media");
              toast.success("Image uploaded successfully");
            }}
          >
            {({ open }) => {
              return (
                <Button
                  disabled={folder === ""}
                  variant={"destructive"}
                  onClick={() => open()}
                >
                  Upload an Image
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
      </div>
    </>
  );
};

export default FolderPopup;
