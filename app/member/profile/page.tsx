import { verifySession } from "@/utils/session";
import { redirect } from "next/navigation";

const MemberDashboardPage = async () => {
  const session = await verifySession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h2>Member Dashboard</h2>
    </div>
  );
};

export default MemberDashboardPage;
