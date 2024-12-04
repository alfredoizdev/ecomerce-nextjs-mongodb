import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  count?: number;
  col?: number;
  h?: string;
};

const StatisticsProductSkeleton = ({
  count = 1,
  col = 1,
  h = "100",
}: Props) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${col} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton
            style={{ height: `${h}px` }}
            className="w-full rounded-xl"
          />
        </div>
      ))}
    </div>
  );
};

export default StatisticsProductSkeleton;
