import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import ListOfUser from "./ListOfUser";
import { Suspense } from "react";
import ProductTableSkeleton from "@/components/Dashboard/ProductTableSkeleton";
import { verifySession } from "@/utils/session";
import { redirect } from "next/navigation";

const UsersPage = async () => {
  const session = await verifySession();

  if (session && session.role !== "admin") {
    redirect("/");
  }

  return (
    <LayoutDashboard>
      <h2>List of User</h2>
      <div className="mt-3">
        <Suspense fallback={<ProductTableSkeleton rows={10} />}>
          <ListOfUser />
        </Suspense>
      </div>
    </LayoutDashboard>
  );
};

export default UsersPage;
