import CustomHeader from "@/components/shared/CustomHeader";
import CollageProduct from "@/components/CollageProduct/CollageProduct";
import ShowProduct from "./ShowProduct";
import { Suspense } from "react";
import ShowProductSkeleton from "@/components/ShowProductSkeleton/ShowProductSkeleton";
import SkeletonCustomCard from "@/components/SkeletonCustomCard/SkeletonCustomCard";
import LayoutRegularPage from "@/components/ui/LayoutRegularPage";
import { getSession } from "@/utils/session";
import { getHomePageThemeaction } from "@/actions/custom";

type TParams = Promise<{ id: string }>;

const ProductPage = async ({ params }: { params: TParams }) => {
  const { id } = await params;

  const session = await getSession();
  const { data } = await getHomePageThemeaction();

  return (
    <LayoutRegularPage background={data?.background} session={session}>
      {/* Header */}
      <CustomHeader title="Product Details" session={session} />
      <Suspense fallback={<ShowProductSkeleton />}>
        <ShowProduct id={id} />
      </Suspense>
      {/* Collage Section */}
      <section className="my-8 max-w-5xl mx-auto py-6 px-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          You may also like
        </h3>
        <Suspense fallback={<SkeletonCustomCard count={4} />}>
          <CollageProduct theme={{ ...data }} id={id} />
        </Suspense>
      </section>
    </LayoutRegularPage>
  );
};

export default ProductPage;
