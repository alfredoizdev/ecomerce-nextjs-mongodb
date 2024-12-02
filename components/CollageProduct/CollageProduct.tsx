import CustomCard from "../CustomCard/CustomCard";
import { getAllProductsExceptCurrentAction } from "@/actions/products";

type Props = {
  id: string;
};

const CollageProduct = async ({ id }: Props) => {
  const products = await getAllProductsExceptCurrentAction(id);

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item) => (
        <CustomCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default CollageProduct;
