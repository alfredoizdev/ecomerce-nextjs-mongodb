"use client";
import Image from "next/image";
import { DTOMedia } from "@/types/Media";
import { useMediaStore } from "@/store/useMediaStore";
import { useEffect } from "react";
import MediaSkeleton from "./MediaSkeleton";

type Props = {
  handleDrawer: () => void;
};

const MediaPrintList = ({ handleDrawer }: Props) => {
  const { getMediaList, mediaList, setCurrentMedia, isLoading } = useMediaStore(
    (state) => state
  );

  useEffect(() => {
    getMediaList();
  }, [getMediaList]);

  const handleOnClick = (image: DTOMedia) => {
    setCurrentMedia(image);
    handleDrawer();
  };

  if (isLoading) {
    return <MediaSkeleton />;
  }

  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 auto-rows-[150px]">
      {mediaList.map((image, index) => {
        // Dynamically adjust sizes for better layout
        const sizeClass =
          index % 6 === 0
            ? "col-span-2 row-span-2"
            : index % 4 === 0
            ? "col-span-2 row-span-1"
            : "col-span-1 row-span-1";

        return (
          <div
            onClick={() => handleOnClick(image)}
            key={index}
            className={`relative ${sizeClass} cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group`}
          >
            <Image
              src={image.secure_url}
              alt={image.public_id}
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              className="rounded-lg object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default MediaPrintList;
