import { useRouter } from "next/navigation";

type Props = {
  id?: string;
};

const UserEditButton = ({ id }: Props) => {
  const { push } = useRouter();

  return <span onClick={() => push(`/admin/users/edit/${id}`)}>Edit User</span>;
};

export default UserEditButton;
