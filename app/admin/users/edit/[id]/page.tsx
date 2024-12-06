import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import { verifySession } from "@/utils/session";
import { redirect } from "next/navigation";

type TParams = Promise<{ id: string }>;

const UsersEditPage = async ({ params }: { params: TParams }) => {
  const { id } = await params;

  const session = await verifySession();

  if (session && session.role !== "admin") {
    redirect("/");
  }

  return (
    <LayoutDashboard>
      <h2>Edit User {id}</h2>
      <div className="mt-3">Edit User</div>
    </LayoutDashboard>
  );
};

export default UsersEditPage;
