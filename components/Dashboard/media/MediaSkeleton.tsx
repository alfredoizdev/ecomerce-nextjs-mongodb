import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  count?: number;
};

const MediaSkeleton = ({ count = 12 }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 auto-rows-[150px]">
      {Array.from({ length: count }).map((_, index) => {
        // Dynamically set sizes for variation
        const sizeClass =
          index % 3 === 0
            ? "col-span-2 row-span-2"
            : index % 2 === 0
            ? "col-span-2 row-span-1"
            : "col-span-1 row-span-1";

        return (
          <div
            key={index}
            className={`relative ${sizeClass} rounded-lg overflow-hidden`}
          >
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        );
      })}
    </div>
  );
};

export default MediaSkeleton;
