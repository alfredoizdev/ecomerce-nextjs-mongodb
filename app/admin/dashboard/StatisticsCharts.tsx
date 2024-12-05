import { getProductsAction } from "@/actions/products";
import DiscountPieChart from "@/components/Dashboard/charts/DiscountPieChart";
import GenderBarChart from "@/components/Dashboard/charts/GenderBarChart";
import OutOfStockValueChart from "@/components/Dashboard/charts/OutStockValueChart";
import { outStockcolumns } from "@/components/Dashboard/OutStockTable/OutStockColumns";
import { OutStockDataTable } from "@/components/Dashboard/OutStockTable/OutStockDataTable";

const StatisticsCharts = async () => {
  //
  const products = await getProductsAction();

  const discountedProducts = products.filter(
    (p) => p.discountPercentage > 0
  ).length;

  const productsOutOfStock = products.filter((p) => p.inStock === "out");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DiscountPieChart
          totalProducts={products.length}
          discountedProducts={discountedProducts}
        />
        <GenderBarChart products={products} />
        <OutOfStockValueChart products={products} />
        {/* <DataTable columns={columns} data={products} /> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OutStockDataTable
          columns={outStockcolumns}
          data={productsOutOfStock}
        />
      </div>
    </>
  );
};

export default StatisticsCharts;
