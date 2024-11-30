import Camp from "@/components/Camp/Camp";
import CustomCard from "@/components/CustomCard/CustomCard";
import Hero from "@/components/shared/Hero/Hero";
import Subcribe from "@/components/Subcribe/Subcribe";

import { PRODUCTS } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="grid grid-cols-1 gap-6 px-5 md:px-8 lg:px-16 pt-6">
        <h2 className="text-3xl font-semibold uppercase">Featured Products</h2>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 lg:px-16 pt-6">
        {PRODUCTS.map((product) => (
          <CustomCard {...product} key={product.id} />
        ))}
      </section>
      <Camp />
      <section className="grid grid-cols-1 gap-6 px-5 md:px-8 lg:px-16 py-9">
        <div className="flex justify-center flex-col items-center ">
          <p>Join our</p>
          <h2 className="text-3xl font-semibold uppercase">Newsletters now!</h2>
          <div className="py-3 w-full flex justify-center items-center">
            <Subcribe />
          </div>
        </div>
      </section>
    </>
  );
}
