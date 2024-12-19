"use client";
import { useActionState, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useMount from "@/hooks/useMount";
import ErrorText from "../ui/ErrorText";
import { toast } from "sonner";
import { addCategoryAction } from "@/actions/category";

const AddCategory = () => {
  const { isMounted } = useMount();
  const [open, setOpen] = useState(false);

  const [state, action, isPending] = useActionState(
    addCategoryAction,
    undefined
  );

  const [formData, setFormData] = useState(
    state?.data || {
      category: "",
    }
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToogle = (status: boolean) => {
    setOpen(status);
  };

  useEffect(() => {
    console.log("state", state);

    if (state?.success) {
      handleToogle(false);
      toast.success(state?.message);
      setFormData({
        category: "",
      });
    }

    if (state?.success === false && state?.message) {
      toast.error(state?.message);
    }
  }, [state]);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="mr-4"
          onClick={() => handleToogle(true)}
        >
          Add Category
        </Button>
      </SheetTrigger>

      <SheetContent
        className="[&>button]:hidden"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <form action={action}>
          <SheetHeader>
            <SheetTitle>Add Gender</SheetTitle>
            <SheetDescription>
              Add Gender to handle collections
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="category" className="text-left">
                Category
              </Label>
              <Input
                placeholder="e.g. man women unixes"
                id="category"
                type="text"
                name="category"
                className="col-span-3"
                onChange={handleOnChange}
                value={formData.category}
              />

              {state?.errors?.category && (
                <ErrorText message={state?.errors?.category[0]} />
              )}
            </div>
          </div>
          <SheetFooter>
            <div className="flex justify-center items-center w-full">
              <Button
                disabled={isPending}
                type="submit"
                size={"lg"}
                className="w-full"
              >
                {isPending ? "Saving..." : "Save"}
              </Button>

              <Button
                variant="destructive"
                onClick={() => handleToogle(false)}
                type="button"
                size={"lg"}
                className="ml-4 w-full"
              >
                Cancel
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddCategory;
