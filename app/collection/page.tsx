import CustomCard from "@/components/CustomCard/CustomCard";
import CustomHeader from "@/components/shared/CustomHeader/CustomHeader";
import { PRODUCTS } from "@/lib/data";

const CollectionPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <CustomHeader
        title="Collection"
        subtext="Discover our latest and greatest products"
      />

      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <CustomCard {...product} key={product.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CollectionPage;
