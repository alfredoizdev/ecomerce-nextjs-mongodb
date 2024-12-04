import { getProductsAction } from "@/actions/products";
import DiscountPieChart from "@/components/Dashboard/charts/DiscountPieChart";
import GenderBarChart from "@/components/Dashboard/charts/GenderBarChart";

const StatisticsCharts = async () => {
  const products = await getProductsAction();

  const discountedProducts = products.filter(
    (p) => p.discountPercentage > 0
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DiscountPieChart
        totalProducts={products.length}
        discountedProducts={discountedProducts}
      />
      <GenderBarChart products={products} />
    </div>
  );
};

export default StatisticsCharts;
