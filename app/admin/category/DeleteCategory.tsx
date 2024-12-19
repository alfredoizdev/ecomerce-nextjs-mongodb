"use client";
import { deleteCategoryAction } from "@/actions/category";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "sonner";

type Props = {
  id: string;
};

const DeleteCategory = ({ id }: Props) => {
  if (!id) return;

  const handleDelete = async (id: string) => {
    const { success, message } = await deleteCategoryAction(id);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <button
      className="ml-2 text-red-700 px-2 py-1 rounded-md"
      onClick={() => handleDelete(id)}
    >
      <IoCloseSharp size={24} />
    </button>
  );
};

export default DeleteCategory;
