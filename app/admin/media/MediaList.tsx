import { getCouldImageAction } from "@/actions/media";
import DetailMedia from "@/components/Dashboard/media/DetailMedia";
import NotFoundText from "@/components/ui/NotFoundText";
import Image from "next/image";

const MediaList = async () => {
  const media = await getCouldImageAction();

  if (!media.length) {
    return <NotFoundText text="No media found" />;
  }

  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 auto-rows-[150px]">
      {media.map((image, index) => {
        // Dynamically adjust sizes for better layout
        const sizeClass =
          index % 6 === 0
            ? "col-span-2 row-span-2"
            : index % 4 === 0
            ? "col-span-2 row-span-1"
            : "col-span-1 row-span-1";

        return (
          <div
            key={index}
            className={`relative ${sizeClass} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group`}
          >
            <Image
              src={image.secure_url}
              alt={image.public_id}
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              className="rounded-lg object-cover"
            />
            <DetailMedia media={image} />
          </div>
        );
      })}
    </div>
  );
};

export default MediaList;
