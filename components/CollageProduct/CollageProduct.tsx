import CustomCard from "../CustomCard/CustomCard";
import { getAllProductsExceptCurrentAction } from "@/actions/products";

type Props = {
  id: string;
  theme: {
    backgroundBtn?: string;
    background?: string;
    textBtn?: string;
    text?: string;
    cardColor?: string;
  };
};

const CollageProduct = async ({ id, theme }: Props) => {
  const products = await getAllProductsExceptCurrentAction(id);

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item) => (
        <CustomCard {...theme} key={item.id} product={item} />
      ))}
    </div>
  );
};

export default CollageProduct;
