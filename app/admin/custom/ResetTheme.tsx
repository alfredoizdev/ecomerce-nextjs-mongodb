"use client";
import { Button } from "@/components/ui/button";
import { extractIdFromUrl } from "@/utils/image";
import { toast } from "sonner";

type Props = {
  image?: string;
};

export default function ResetTheme({ image }: Props) {
  const imageId = extractIdFromUrl(image || "");
  const handleOnClick = async () => {
    try {
      const response = await fetch(`/api/reset?id=${imageId}`, {
        method: "GET",
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return <Button onClick={handleOnClick}>Reset Theme</Button>;
}
