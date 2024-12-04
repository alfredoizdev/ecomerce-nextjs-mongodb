import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import { verifySession } from "@/utils/session";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await verifySession();

  if (session && session.role !== "admin") {
    redirect("/members/dashboard");
  }

  return (
    <LayoutDashboard>
      <h2>Dashboard</h2>
    </LayoutDashboard>
  );
};

export default DashboardPage;
