"use client";
import { useActionState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import UploadImage from "./UploadImage";
import useHandleUser from "@/hooks/useHandleUser";
import { createUserAction } from "@/actions/users";

const CreateUser = () => {
  const [state, action, isPending] = useActionState(
    createUserAction,
    undefined
  );
  const { formState, handleOnChange, imageUrl, setImageUrl, push } =
    useHandleUser(state);

  return (
    <Card className="rounded-md border w-auto">
      <CardHeader className="flex-row justify-between align-middle space-y-0 py-4">
        <CardTitle className="text-lg">Add User</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div>
          <UploadImage setImageUrl={setImageUrl} prevImage="user" />
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
            <div className="mb-3">
              <Label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleOnChange}
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.password}
                </p>
              )}
            </div>
            <input
              type="hidden"
              name="image"
              value={imageUrl}
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
                  <span>Add User</span>
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

export default CreateUser;
