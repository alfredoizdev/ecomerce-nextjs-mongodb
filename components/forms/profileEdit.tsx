"use client";
import { useActionState, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { updateUserDetailsAction } from "@/actions/users";
import { TUser, TUserDetailDTO } from "@/types/User";
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

type Props = {
  user: TUser | null;
  userDetail: TUserDetailDTO | null;
};

const ProfileEdit = ({ user, userDetail }: Props) => {
  const { isMounted } = useMount();
  const [open, setOpen] = useState(false);

  const [state, action, isPending] = useActionState(
    updateUserDetailsAction,
    undefined
  );

  const [formData, setFormData] = useState(
    state?.data || {
      phone: userDetail?.phone || "",
      address: userDetail?.address || "",
      city: userDetail?.city || "",
      state: userDetail?.state || "",
      zipCode: userDetail?.zipCode || "",
      country: userDetail?.country || "",
      id: user?.id || "",
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
    if (state?.success) {
      handleToogle(false);
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
          Edit Profile
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
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click update when, you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="phone" className="text-left">
                Phone
              </Label>
              <Input
                placeholder="e.g. 123-456-7890"
                id="phone"
                type="text"
                name="phone"
                className="col-span-3"
                onChange={handleOnChange}
                value={formData.phone || ""}
              />

              {state?.errors?.phone && (
                <ErrorText message={state?.errors?.phone[0]} />
              )}
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="address" className="text-left">
                Address
              </Label>
              <Input
                placeholder="e.g. 123 Main St"
                id="address"
                type="text"
                name="address"
                className="col-span-3"
                onChange={handleOnChange}
                value={formData.address}
              />
              {state?.errors?.address && (
                <ErrorText message={state?.errors?.address[0]} />
              )}
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="address" className="text-left">
                City
              </Label>
              <Input
                id="city"
                type="text"
                name="city"
                className="col-span-3"
                placeholder="e.g. Springfield"
                onChange={handleOnChange}
                value={formData.city}
              />
              {state?.errors?.city && (
                <ErrorText message={state?.errors?.city[0]} />
              )}
            </div>
            <input type="hidden" name="id" value={user?.id || ""} />
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="state" className="text-left">
                State
              </Label>
              <Input
                id="state"
                type="text"
                name="state"
                className="col-span-3"
                placeholder="e.g. Texas"
                onChange={handleOnChange}
                value={formData.state}
              />
              {state?.errors?.state && (
                <ErrorText message={state?.errors?.state[0]} />
              )}
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="zipCode" className="text-left">
                Zipcode
              </Label>
              <Input
                id="zipCode"
                type="text"
                name="zipCode"
                className="col-span-3"
                placeholder="e.g. 62701"
                onChange={handleOnChange}
                value={formData.zipCode}
              />
              {state?.errors?.zipCode && (
                <ErrorText message={state?.errors?.zipCode[0]} />
              )}
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="country" className="text-left">
                Country
              </Label>
              <Input
                id="country"
                type="text"
                name="country"
                className="col-span-3"
                onChange={handleOnChange}
                value={formData.country}
                placeholder="e.g. United States"
              />
              {state?.errors?.country && (
                <ErrorText message={state?.errors?.country[0]} />
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
                {isPending ? "Updating..." : "Update"}
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

export default ProfileEdit;
