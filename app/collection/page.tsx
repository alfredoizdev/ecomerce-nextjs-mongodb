import CustomHeader from "@/components/shared/CustomHeader";
import { Suspense } from "react";
import CollectionList from "../../server/CollectionList";
import SkeletonCustomCard from "@/components/SkeletonCustomCard/SkeletonCustomCard";
import SubTitle from "@/components/shared/SubTitle";
import LayoutRegularPage from "@/components/ui/LayoutRegularPage";
import { getSession } from "@/utils/session";
import { getHomePageThemeaction } from "@/actions/custom";

const CollectionPage = async () => {
  const session = await getSession();
  const { data } = await getHomePageThemeaction();

  return (
    <LayoutRegularPage theme={data} session={session}>
      <div className="bg-gray-100 min-h-screen">
        <CustomHeader title="Collection" session={session} />

        <main className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SubTitle
              textColor={data?.text}
              text="Discover our latest and greatest products"
            />
            <Suspense fallback={<SkeletonCustomCard count={8} />}>
              <CollectionList />
            </Suspense>
          </div>
        </main>
      </div>
    </LayoutRegularPage>
  );
};

export default CollectionPage;
