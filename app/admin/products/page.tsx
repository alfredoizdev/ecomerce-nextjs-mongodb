import { getProductsAction } from "@/actions/products";
import { columns } from "@/components/Dashboard/Columns";
import { DataTable } from "@/components/Dashboard/DataTable";
import ProductTableSkeleton from "@/components/Dashboard/ProductTableSkeleton";
import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import { verifySession } from "@/utils/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const ProductAdminPage = async () => {
  const session = await verifySession();

  if (session && session.role !== "admin") {
    redirect("/");
  }

  const products = await getProductsAction();

  return (
    <LayoutDashboard>
      <h2>Products</h2>
      <div className="w-full mx-auto py-10">
        <Suspense fallback={<ProductTableSkeleton rows={10} />}>
          <DataTable columns={columns} data={products} />
        </Suspense>
      </div>
    </LayoutDashboard>
  );
};

export default ProductAdminPage;
