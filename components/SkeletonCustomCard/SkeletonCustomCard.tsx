type CustomCardSkeletonProps = {
  count: number;
};

const SkeletonCustomCard = ({ count }: CustomCardSkeletonProps) => {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md text-center animate-pulse"
          >
            <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        ))}
    </>
  );
};

export default SkeletonCustomCard;
