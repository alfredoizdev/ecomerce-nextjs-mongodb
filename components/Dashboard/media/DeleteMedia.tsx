"use client";
import { deleteMediaAction } from "@/actions/media";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

type Props = {
  publicImageId: string;
};

const DeleteMedia = ({ publicImageId }: Props) => {
  const handleDelete = async (publicImageId: string) => {
    const { success, message } = await deleteMediaAction(publicImageId);

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <button
      onClick={() => handleDelete(publicImageId)}
      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <FiTrash2 className="text-white text-2xl" />
    </button>
  );
};

export default DeleteMedia;
