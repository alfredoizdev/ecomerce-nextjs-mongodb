const ShowProductSkeleton = () => {
  return (
    <section className="max-w-5xl mx-auto py-10 px-4 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
        {/* Image Skeleton */}
        <div className="relative w-full h-96 bg-gray-300 rounded-lg"></div>

        {/* Product Info Skeleton */}
        <div>
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>

          {/* Additional Details Skeleton */}
          <ul className="space-y-4">
            <li className="h-4 bg-gray-300 rounded w-2/3"></li>
            <li className="h-4 bg-gray-300 rounded w-1/2"></li>
            <li className="h-4 bg-gray-300 rounded w-3/4"></li>
            <li className="h-4 bg-gray-300 rounded w-1/2"></li>
            <li className="h-4 bg-gray-300 rounded w-2/3"></li>
          </ul>

          {/* Actions Skeleton */}
          <div className="mt-6 flex space-x-4">
            <div className="h-10 bg-gray-300 rounded w-32"></div>
            <div className="h-10 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowProductSkeleton;
