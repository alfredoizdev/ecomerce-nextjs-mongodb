"use client";
import { useActionState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import UploadImage from "./UploadImage";
import useHandleUser from "@/hooks/useHandleUser";
import { updateUserAction } from "@/actions/users";
import { TUser } from "@/types/User";

type Props = {
  user: TUser;
};

const EditUser = ({ user }: Props) => {
  const [state, action, isPending] = useActionState(
    updateUserAction,
    undefined
  );
  const {
    formState,
    handleOnChange,
    imageUrl,
    setImageUrl,
    push,
    setPublicImageId,
  } = useHandleUser(state, {
    name: user?.name || "",
    email: user?.email,
    password: "",
    avatar: user?.avatar || "",
    id: user?.id || "",
    publicImageId: "",
  });

  return (
    <Card className="rounded-md border w-auto">
      <CardHeader className="flex-row justify-between align-middle space-y-0 py-4">
        <CardTitle className="text-lg">Add User</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div>
          <UploadImage
            setImageUrl={setImageUrl}
            setPubliImageId={setPublicImageId}
            imageUrl={user.avatar}
          />
        </div>
        <form action={action}>
          <div className="grid grid-cols-1 gap-6">
            <div className="mb-3">
              <Label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="name"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleOnChange}
              />
              {state?.errors?.name && (
                <p className="text-sm text-red-500 mt-1">{state.errors.name}</p>
              )}
            </div>
            <div className="mb-3">
              <Label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleOnChange}
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.email}
                </p>
              )}
            </div>
            <input
              type="hidden"
              name="avatar"
              value={imageUrl}
              onChange={handleOnChange}
            />
            <input
              type="hidden"
              name="publicImageId"
              value={formState.publicImageId}
            />
            <input
              type="hidden"
              name="id"
              value={formState.id}
              onChange={handleOnChange}
            />
            {/* Submit Button */}
            <div className="py-5 flex justify-end gap-2 align-middle">
              <Button
                variant="default"
                className=""
                disabled={isPending}
                type="submit"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <span>Update</span>
                )}
              </Button>
              <Button
                type="button"
                variant={"destructive"}
                className=""
                onClick={() => push("/admin/users")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditUser;
