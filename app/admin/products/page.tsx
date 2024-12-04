import { getProductsAction } from "@/actions/products";
import { columns } from "@/components/Dashboard/Columns";
import { DataTable } from "@/components/Dashboard/DataTable";
import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";

const ProductAdminPage = async () => {
  const products = await getProductsAction();

  return (
    <LayoutDashboard>
      <h2>Products</h2>
      <div className="w-full mx-auto py-10">
        <DataTable columns={columns} data={products} />
      </div>
    </LayoutDashboard>
  );
};

export default ProductAdminPage;
