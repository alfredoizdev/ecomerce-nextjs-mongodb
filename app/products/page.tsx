import { Suspense } from "react";
import CustomHeader from "@/components/shared/CustomHeader";
import ProductList from "@/server/ProductList";
import SkeletonCustomCard from "@/components/SkeletonCustomCard/SkeletonCustomCard";
import DropMenuFilter from "@/components/DropMenuFilter/DropMenuFilter";
import LayoutRegularPage from "@/components/ui/LayoutRegularPage";
import { verifySession } from "@/utils/session";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProductsPage = async (props: { searchParams: SearchParams }) => {
  const { gender } = await props.searchParams;
  const setGender = typeof gender === "string" ? gender : "all";

  const session = await verifySession();

  return (
    <LayoutRegularPage session={session}>
      <div className="bg-gray-100 min-h-screen">
        <CustomHeader title="Products" session={session} />

        <main className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
          <DropMenuFilter gender={setGender} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Suspense fallback={<SkeletonCustomCard count={8} />}>
              <ProductList gender={setGender} />
            </Suspense>
          </div>
        </main>
      </div>
    </LayoutRegularPage>
  );
};

export default ProductsPage;
