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
import SetImageFromGallery from "./media/SetImageFromGallery";
import useMount from "@/hooks/useMount";

const CreateUser = () => {
  const [state, action, isPending] = useActionState(
    createUserAction,
    undefined
  );

  const { isMounted } = useMount();
  const {
    formState,
    handleOnChange,
    imageUrl,
    setImageUrl,
    push,
    setPublicImageId,
  } = useHandleUser(state);

  if (!isMounted) return null;

  return (
    <Card className="rounded-md border w-auto">
      <CardHeader className="flex-row justify-between align-middle space-y-0 py-4">
        <CardTitle className="text-lg">Add User</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full">
          {/* Upload Section */}
          <div className="flex flex-col items-center">
            <UploadImage
              setPubliImageId={setPublicImageId}
              setImageUrl={setImageUrl}
            />
            <p className="text-sm text-gray-600 mt-2 text-center">Upload</p>
          </div>

          {/* Separator */}
          <div className="relative flex items-center w-full lg:w-auto lg:px-4">
            <span className="text-gray-500 text-sm font-semibold px-2 z-10 bg-white">
              OR
            </span>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>

          {/* Choose from Gallery Section */}
          <div className="flex flex-col items-center">
            <SetImageFromGallery />
            <p className="text-sm text-gray-600 mt-2 text-center lg:text-left">
              Choose from Gallery
            </p>
          </div>
        </div>
        {/* Horizontal Rule Separator */}
        <hr className="my-6 border-t border-gray-300" />
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
            <input
              type="hidden"
              name="publicImageId"
              value={formState.publicImageId}
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
