"use client";
import { deleteMediaAction } from "@/actions/media";
import { Button } from "@/components/ui/button";
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
    <Button
      style={{ width: "100%" }}
      variant={"destructive"}
      onClick={() => handleDelete(publicImageId)}
    >
      <FiTrash2 className="text-white text-2xl" />
      <span>Delete</span>
    </Button>
  );
};

export default DeleteMedia;
