import { Skeleton } from "../ui/skeleton";

type Props = {
  items: number;
  flexDirection?: string;
};

const SkeletonMenu = ({ flexDirection = "row", items }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: `${flexDirection === "column" ? "column" : "row"}`,
      }}
    >
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex-1">
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonMenu;
