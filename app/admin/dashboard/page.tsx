import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import { verifySession } from "@/utils/session";
import { redirect } from "next/navigation";
import StatisticsProduct from "./StatisticsProduct";
import { Suspense } from "react";
import StatisticsProductSkeleton from "@/components/Dashboard/StatisticsProductSkeleton";
import StatisticsCharts from "./StatisticsCharts";

const DashboardPage = async () => {
  const session = await verifySession();

  if (session && session.role !== "admin") {
    redirect("/");
  }

  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Suspense
          fallback={<StatisticsProductSkeleton count={4} col={4} h="110" />}
        >
          <StatisticsProduct />
        </Suspense>
        <Suspense
          fallback={<StatisticsProductSkeleton count={2} col={2} h="400" />}
        >
          <StatisticsCharts />
        </Suspense>
      </div>
    </LayoutDashboard>
  );
};

export default DashboardPage;
