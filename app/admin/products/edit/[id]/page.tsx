import { findProductByIdAction } from "@/actions/products";
import EditProduct from "@/components/Dashboard/EditProduct";
import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import NotFoundText from "@/components/ui/NotFoundText";

type TParams = Promise<{ id: string }>;

const ProductEditPage = async ({ params }: { params: TParams }) => {
  const { id } = await params;

  const { data } = await findProductByIdAction(id);

  if (!data) {
    return <NotFoundText text="Product Not Found" />;
  }

  return (
    <LayoutDashboard>
      <h2>Products</h2>
      <EditProduct product={data} />
    </LayoutDashboard>
  );
};

export default ProductEditPage;
