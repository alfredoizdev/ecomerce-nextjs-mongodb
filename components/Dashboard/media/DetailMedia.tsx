"use client";
import Drawer from "@/components/shared/Drawer";
import { DTOMedia } from "@/types/Media";
import Image from "next/image";
import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import DeleteMedia from "./DeleteMedia";

type Props = {
  media: DTOMedia;
};

const DetailMedia = ({ media }: Props) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <IoIosEye size={35} className="text-white text-2xl" />
      </button>
      <Drawer
        width="w-full"
        height="h-screen"
        position="right"
        isOpen={open}
        onClose={toggleDrawer}
      >
        <h2 className="mb-3">Media</h2>
        <div className="grid grid-cols-1 gap-4 items-center">
          {/* Image Section */}
          <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group h-64">
            <Image
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              src={media.secure_url}
              alt={media.public_id}
              className="rounded-lg object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="md:col-span-2 space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Belong to:</strong> {media.folder.split("/")[1]}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Format:</strong> {media.format}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Size:</strong> {(media.bytes / 1000).toFixed(2)} KB
            </p>
            <p className="text-sm text-gray-600">
              <strong>Created at:</strong>{" "}
              {new Date(media.created_at).toLocaleString()}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-0">
            <DeleteMedia publicImageId={media.public_id} />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DetailMedia;
