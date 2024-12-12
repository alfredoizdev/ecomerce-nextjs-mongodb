import Hero from "@/components/shared/Hero";
import Subcribe from "@/components/Subcribe/Subcribe";

import ProductList from "@/server/ProductList";
import { Suspense } from "react";
import SkeletonCustomCard from "@/components/SkeletonCustomCard/SkeletonCustomCard";
import LayoutRegularPage from "@/components/ui/LayoutRegularPage";
import { getSession } from "@/utils/session";
import { getHomePageThemeaction } from "@/actions/custom";
import { THEME_DEFAULT } from "@/constants/theme";
import { darkenColor } from "@/utils/theme";
import FetchCampaing from "@/server/FetchCampaing";

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
          <Suspense fallback={<SkeletonCustomCard count={4} />}>
            <ProductList theme={{ ...data }} limit={4} />
          </Suspense>
        </section>
        <Suspense fallback={<SkeletonCustomCard count={4} />}>
          <FetchCampaing />
        </Suspense>
        <section className="grid grid-cols-1 gap-6 px-5 md:px-8 lg:px-16 py-9">
          <Subcribe {...data} />
        </section>
      </div>
    </LayoutRegularPage>
  );
}
