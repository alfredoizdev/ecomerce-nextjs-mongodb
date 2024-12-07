"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ResetTheme() {
  const handleOnClick = async () => {
    try {
      const response = await fetch("/api/reset", {
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
