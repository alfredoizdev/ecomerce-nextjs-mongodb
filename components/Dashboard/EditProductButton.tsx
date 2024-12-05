import { useRouter } from "next/navigation";

type Props = {
  id?: string;
};

const EditProductButton = ({ id }: Props) => {
  const { push } = useRouter();

  return (
    <span onClick={() => push(`/admin/products/edit/${id}`)}>Edit Product</span>
  );
};

export default EditProductButton;
