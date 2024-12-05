import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  rows?: number; // Cantidad de filas para simular en la tabla
};

const ProductTableSkeleton = ({ rows = 5 }: Props) => {
  return (
    <div className="space-y-6">
      {/* Top Buttons */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32 rounded-lg" /> {/* Espaciado */}
        <div className="flex space-x-3">
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="border border-gray-200 rounded-lg shadow-sm">
        <div className="grid grid-cols-4 gap-3 border-b border-gray-200 p-4">
          {/* Header Skeleton */}
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-full rounded-md" />
          ))}
        </div>
        <div className="divide-y divide-gray-200">
          {/* Rows Skeleton */}
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-3 p-4 items-center"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full rounded-md" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-end space-x-3">
        <Skeleton className="h-8 w-20 rounded-lg" /> {/* Prev */}
        <Skeleton className="h-8 w-20 rounded-lg" /> {/* Next */}
      </div>
    </div>
  );
};

export default ProductTableSkeleton;
