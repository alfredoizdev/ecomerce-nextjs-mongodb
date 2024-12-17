import dynamic from "next/dynamic";
import Subcribe from "@/components/Subcribe/Subcribe";

import LayoutRegularPage from "@/components/ui/LayoutRegularPage";
import { getSession } from "@/utils/session";
import { getHomePageThemeaction } from "@/actions/custom";
import { THEME_DEFAULT } from "@/constants/theme";
import { darkenColor } from "@/utils/theme";

const Hero = dynamic(() => import("@/components/shared/Hero"), {
  ssr: true,
});

const SkeletonCustomCard = dynamic(
  () => import("@/components/SkeletonCustomCard/SkeletonCustomCard")
);

const ProductList = dynamic(() => import("@/server/ProductList"), {
  loading: () => <SkeletonCustomCard count={4} />,
});

const FetchCampaing = dynamic(() => import("@/server/FetchCampaing"), {
  loading: () => <SkeletonCustomCard count={4} />,
});

export default async function Home() {
  const session = await getSession();
  const { data } = await getHomePageThemeaction();

  const titleColor = darkenColor(data?.text || THEME_DEFAULT.text, 1);

  return (
    <LayoutRegularPage session={session} theme={data}>
      <Hero {...data} session={session} />
      <div className="max-w-7xl mx-auto">
        <section className="grid grid-cols-1 gap-6 px-5 md:px-8 lg:px-16 pt-6">
          <h2
            className="text-3xl font-semibold uppercase"
            style={{
              color: titleColor,
            }}
          >
            Featured Products
          </h2>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 lg:px-16 pt-6">
          <ProductList theme={{ ...data }} limit={4} />
        </section>
        <FetchCampaing />
        <section className="grid grid-cols-1 gap-6 px-5 md:px-8 lg:px-16 py-9">
          <Subcribe {...data} />
        </section>
      </div>
    </LayoutRegularPage>
  );
}
