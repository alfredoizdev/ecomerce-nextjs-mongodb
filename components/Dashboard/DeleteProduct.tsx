import { deleteProductAction } from "@/actions/products";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type Props = {
  product: {
    id?: string;
    image?: string;
  };
};

const DeleteProduct = ({ product }: Props) => {
  const handleDeleteProduct = async (id: string, image: string) => {
    const { success, message } = await deleteProductAction(id, image);

    if (success) {
      toast.warning(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <DropdownMenuItem
      onClick={() =>
        handleDeleteProduct(product?.id || "", product?.image || "")
      }
    >
      Delete this product
    </DropdownMenuItem>
  );
};

export default DeleteProduct;
