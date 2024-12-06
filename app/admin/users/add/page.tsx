import CreateUser from "@/components/Dashboard/CreateUser";
import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import { verifySession } from "@/utils/session";
import { redirect } from "next/navigation";

const UsersAddPage = async () => {
  const session = await verifySession();

  if (session && session.role !== "admin") {
    redirect("/");
  }

  return (
    <LayoutDashboard>
      <div className="mt-3">
        <CreateUser />
      </div>
    </LayoutDashboard>
  );
};

export default UsersAddPage;
