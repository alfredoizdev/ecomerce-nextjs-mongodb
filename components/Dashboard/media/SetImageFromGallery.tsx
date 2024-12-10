"use client";
import Image from "next/image";
import { useState } from "react";
import { IoImages } from "react-icons/io5";
import Drawer from "../../shared/Drawer";
import MediaPrintList from "./MediaPrintList";
import { useMediaStore } from "@/store/useMediaStore";

const SetImageFromGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentMedia } = useMediaStore((state) => state);

  const handToogleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="mb-4 w-[150px] h-[150px] border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
        <div
          className="flex justify-center items-center w-full h-full"
          onClick={handToogleDrawer}
        >
          {currentMedia ? (
            <div className="relative w-full h-full">
              <Image
                src={currentMedia.secure_url}
                alt={currentMedia.public_id}
                fill
                sizes="400px"
                style={{ objectFit: "cover" }}
                className="rounded-lg object-cover"
              />
            </div>
          ) : (
            <IoImages size={100} className="text-gray-900 mb-2" />
          )}
        </div>
      </div>
      <Drawer
        width="w-full"
        height="h-2/3"
        position="bottom"
        isOpen={isOpen}
        onClose={handToogleDrawer}
      >
        <h2 className="mb-3">Media</h2>
        <MediaPrintList handleDrawer={handToogleDrawer} />
      </Drawer>
    </>
  );
};

export default SetImageFromGallery;
