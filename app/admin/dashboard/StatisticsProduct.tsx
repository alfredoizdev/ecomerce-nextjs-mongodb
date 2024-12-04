import { getProductsAction } from "@/actions/products";
import DashboardCard from "@/components/Dashboard/DashBoardCard";
import { DollarSign, Percent } from "lucide-react";
import { FiBox } from "react-icons/fi";

const StatisticsProduct = async () => {
  const products = await getProductsAction();

  const totalProducts = products.length;
  const discountedProducts = products.filter(
    (p) => p.discountPercentage > 0
  ).length;

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = totalProducts > 0 ? totalPrice / totalProducts : 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Products"
          value={totalProducts}
          icon={<FiBox size={32} />}
          bgColor="bg-blue-100"
        />
        <DashboardCard
          title="Products on Discount"
          value={discountedProducts}
          icon={<Percent size={32} />}
          bgColor="bg-green-100"
        />
        <DashboardCard
          title="Average Price (Discounted)"
          value={`$${averagePrice.toFixed(2)}`}
          icon={<DollarSign size={32} />}
          bgColor="bg-yellow-100"
        />
        <DashboardCard
          title="Total in Products"
          value={totalPrice}
          icon={<DollarSign size={32} />}
          bgColor="bg-red-100"
        />
      </div>
    </>
  );
};

export default StatisticsProduct;
