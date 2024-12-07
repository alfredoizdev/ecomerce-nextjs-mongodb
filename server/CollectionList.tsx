import { getHomePageThemeaction } from "@/actions/custom";
import { getProductsAction } from "@/actions/products";
import CustomCard from "@/components/CustomCard/CustomCard";
import NotFoundText from "@/components/ui/NotFoundText";

type Props = {
  limit?: number;
  slug?: string;
};

const CollectionList = async ({ limit, slug }: Props) => {
  const products = await getProductsAction(slug);
  const { data } = await getHomePageThemeaction();

  if (!products.length) return <NotFoundText text="Collection Not found" />;

  if (limit)
    return products
      .slice(0, limit)
      .map((product) => (
        <CustomCard product={{ ...product }} {...data} key={product.id} />
      ));

  return (
    <>
      {products.map((product) => (
        <CustomCard product={{ ...product }} {...data} key={product.id} />
      ))}
    </>
  );
};

export default CollectionList;
