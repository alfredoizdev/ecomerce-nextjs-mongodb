import CustomHeader from "@/components/shared/CustomHeader";
import { Suspense } from "react";

import SkeletonCustomCard from "@/components/SkeletonCustomCard/SkeletonCustomCard";
import CollectionList from "@/server/CollectionList";
import SubTitle from "@/components/shared/SubTitle";
import LayoutRegularPage from "@/components/ui/LayoutRegularPage";
import { cookies } from "next/headers";

type TParams = Promise<{ slug: string }>;

const CollectionPage = async ({ params }: { params: TParams }) => {
  const { slug } = await params;

  const kookieStore = await cookies();
  const cookie = kookieStore.get("session")?.value;
  const isLogin = cookie !== undefined;

  return (
    <LayoutRegularPage isLogin={isLogin}>
      <div className="bg-gray-100 min-h-screen">
        <CustomHeader title={`Collection: ${slug}`} isLogin={isLogin} />
        <main className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
          <div className="pb-3">
            <SubTitle text="Discover our latest and greatest products" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Suspense fallback={<SkeletonCustomCard count={8} />}>
              <CollectionList slug={slug} />
            </Suspense>
          </div>
        </main>
      </div>
    </LayoutRegularPage>
  );
};

export default CollectionPage;
