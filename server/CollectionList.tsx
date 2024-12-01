import { getProductsAction } from "@/actions/products";
import CustomCard from "@/components/CustomCard/CustomCard";
import NotFoundText from "@/components/ui/NotFoundText";

type Props = {
  limit?: number;
};

const CollectionList = async ({ limit }: Props) => {
  const products = await getProductsAction();

  if (!products.length) return <NotFoundText text="Collection Not found" />;

  if (limit)
    return products
      .slice(0, limit)
      .map((product) => <CustomCard {...product} key={product.id} />);

  return (
    <>
      {products.map((product) => (
        <CustomCard {...product} key={product.id} />
      ))}
    </>
  );
};

export default CollectionList;
