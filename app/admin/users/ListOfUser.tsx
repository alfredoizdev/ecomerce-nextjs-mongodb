import { getUsersAction } from "@/actions/users";
import { userColumns } from "@/components/Dashboard/UserTable/UserColumns";
import { UserDataTable } from "@/components/Dashboard/UserTable/UserDataTable";
import { getSession } from "@/utils/session";

const ListOfUser = async () => {
  const session = await getSession();

  const { data } = await getUsersAction();

  const ListOfUser = data.filter((user) => user.email !== session.email);

  return (
    <div>
      <UserDataTable columns={userColumns} data={ListOfUser} />
    </div>
  );
};

export default ListOfUser;
