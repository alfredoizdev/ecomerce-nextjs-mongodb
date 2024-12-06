import { getUserByIdAction } from "@/actions/users";
import EditUser from "@/components/Dashboard/EditUser";
import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import NotFoundText from "@/components/ui/NotFoundText";
import { verifySession } from "@/utils/session";
import { redirect } from "next/navigation";

type TParams = Promise<{ id: string }>;

const UsersEditPage = async ({ params }: { params: TParams }) => {
  const { id } = await params;

  const session = await verifySession();

  if (session && session.role !== "admin") {
    redirect("/");
  }

  const { data, success, message } = await getUserByIdAction(id);

  return (
    <LayoutDashboard>
      <h2>Edit User {id}</h2>
      <div className="mt-3">
        {!success && <NotFoundText text={message} />}
        {data && <EditUser user={data} />}
      </div>
    </LayoutDashboard>
  );
};

export default UsersEditPage;
