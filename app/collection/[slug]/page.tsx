import CustomHeader from "@/components/shared/CustomHeader/CustomHeader";
import { Suspense } from "react";

import SkeletonCustomCard from "@/components/SkeletonCustomCard/SkeletonCustomCard";
import CollectionList from "@/server/CollectionList";

const CollectionPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = await params;

  return (
    <div className="bg-gray-100 min-h-screen">
      <CustomHeader
        title="Collection"
        subtext="Discover our latest and greatest products"
      />

      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Suspense fallback={<SkeletonCustomCard count={8} />}>
            <CollectionList slug={slug} />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default CollectionPage;
