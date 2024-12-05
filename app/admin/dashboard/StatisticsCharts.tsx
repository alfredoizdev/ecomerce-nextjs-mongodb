import { getProductsAction } from "@/actions/products";
import DiscountPieChart from "@/components/Dashboard/charts/DiscountPieChart";
import GenderBarChart from "@/components/Dashboard/charts/GenderBarChart";
import OutOfStockValueChart from "@/components/Dashboard/charts/OutStockValueChart";
import OutOfStockTable from "@/components/Dashboard/OutOfStockTable";

const StatisticsCharts = async () => {
  const products = await getProductsAction();

  const discountedProducts = products.filter(
    (p) => p.discountPercentage > 0
  ).length;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DiscountPieChart
          totalProducts={products.length}
          discountedProducts={discountedProducts}
        />
        <GenderBarChart products={products} />
        <OutOfStockValueChart products={products} />
      </div>
      <OutOfStockTable products={products} />
    </>
  );
};

export default StatisticsCharts;
