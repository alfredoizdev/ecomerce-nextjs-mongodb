"use client";

import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import useHandleHomeTheme from "@/hooks/useHandleHomeTheme";
import { updateHomePageThemeAction } from "@/actions/custom";
import UploadHeroBanner from "./UploadHeroBanner";
import ColorPickerField from "./ColorPickerField";

type Props = {
  initialState:
    | {
        background: string;
        text: string;
        backgroundBtn: string;
        textBtn: string;
        heroTitle: string;
        heroSubtitle: string;
        heroBannerImage: string;
        heroColorTitle: string;
        heroColorSubtitle: string;
        cardColor: string;
      }
    | undefined;
};

const UpdateHomeThemeForm = ({ initialState }: Props) => {
  const [state, action, isPending] = useActionState(
    updateHomePageThemeAction,
    undefined
  );
  const { formState, handleOnChange, setImageUrl, push } = useHandleHomeTheme(
    state,
    initialState
  );

  return (
    <div>
      <Label className="block text-sm font-medium text-gray-700 mb-2">
        Hero Banner Image
      </Label>
      <UploadHeroBanner
        imageUrl={formState.heroBannerImage}
        setImageUrl={setImageUrl}
      />
      <form action={action}>
        {/* Hero Section Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="mb-2">
            <Label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="heroTitle"
            >
              Hero Title
            </Label>
            <Input
              id="heroTitle"
              type="text"
              name="heroTitle"
              value={formState.heroTitle}
              onChange={handleOnChange}
            />
            {state?.errors?.heroTitle && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.heroTitle}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="heroSubtitle"
            >
              Hero Subtitle
            </Label>
            <Input
              id="heroSubtitle"
              type="text"
              name="heroSubtitle"
              value={formState.heroSubtitle}
              onChange={handleOnChange}
            />
            {state?.errors?.heroSubtitle && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.heroSubtitle}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="heroColorTitle"
            >
              Hero Title Color
            </Label>
            <input
              hidden
              id="heroColorTitle"
              type="text"
              name="heroColorTitle"
              value={formState.heroColorTitle}
              onChange={handleOnChange}
            />
            <ColorPickerField
              color={formState.heroColorTitle}
              onChange={(newColor) =>
                handleOnChange({
                  target: { name: "heroColorTitle", value: newColor },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            {state?.errors?.heroColorTitle && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.heroColorTitle}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="heroColorSubtitle"
            >
              Hero Subtitle Color
            </Label>
            <input
              hidden
              id="heroColorSubtitle"
              type="text"
              name="heroColorSubtitle"
              value={formState.heroColorSubtitle}
              onChange={handleOnChange}
            />
            <ColorPickerField
              color={formState.heroColorSubtitle}
              onChange={(newColor) =>
                handleOnChange({
                  target: { name: "heroColorSubtitle", value: newColor },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            {state?.errors?.heroColorSubtitle && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.heroColorSubtitle}
              </p>
            )}
          </div>
        </div>

        {/* Hero Banner */}
        <div className="mb-6">
          <input
            type="hidden"
            name="heroBannerImage"
            value={formState.heroBannerImage}
            onChange={handleOnChange}
          />
        </div>

        <div className="border-t border-gray-200 my-6"></div>
        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            General Colors
          </h2>
        </div>

        {/* General Colors Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 3">
          <div className="mb-2">
            <Label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="cardColor"
            >
              Card Color
            </Label>
            <input
              id="cardColor"
              hidden
              type="text"
              name="cardColor"
              value={formState.cardColor}
              onChange={handleOnChange}
            />
            <ColorPickerField
              color={formState.cardColor}
              onChange={(newColor) =>
                handleOnChange({
                  target: { name: "cardColor", value: newColor },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            {state?.errors?.cardColor && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.cardColor}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="background"
            >
              Background Color
            </Label>
            <input
              hidden
              id="background"
              type="text"
              name="background"
              value={formState.background}
              onChange={handleOnChange}
            />
            <ColorPickerField
              color={formState.background}
              onChange={(newColor) =>
                handleOnChange({
                  target: { name: "background", value: newColor },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            {state?.errors?.background && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.background}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="text"
            >
              Text Color
            </Label>
            <input
              hidden
              id="text"
              type="text"
              name="text"
              value={formState.text}
              onChange={handleOnChange}
            />
            <ColorPickerField
              color={formState.text}
              onChange={(newColor) =>
                handleOnChange({
                  target: { name: "text", value: newColor },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            {state?.errors?.text && (
              <p className="text-sm text-red-500 mt-1">{state.errors.text}</p>
            )}
          </div>
          <div className="mb-2">
            <Label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="backgroundBtn"
            >
              Button Background Color
            </Label>
            <input
              hidden
              id="backgroundBtn"
              type="text"
              name="backgroundBtn"
              value={formState.backgroundBtn}
              onChange={handleOnChange}
            />
            <ColorPickerField
              color={formState.backgroundBtn}
              onChange={(newColor) =>
                handleOnChange({
                  target: { name: "backgroundBtn", value: newColor },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            {state?.errors?.backgroundBtn && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.backgroundBtn}
              </p>
            )}
          </div>
          <div className="mb-2">
            <Label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="textBtn"
            >
              Button Text Color
            </Label>
            <input
              hidden
              id="textBtn"
              type="text"
              name="textBtn"
              value={formState.textBtn}
              onChange={handleOnChange}
            />
            <ColorPickerField
              color={formState.textBtn}
              onChange={(newColor) =>
                handleOnChange({
                  target: { name: "textBtn", value: newColor },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            {state?.errors?.textBtn && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.textBtn}
              </p>
            )}
          </div>
        </div>

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
              <span>Update Theme</span>
            )}
          </Button>
          <Button
            type="button"
            variant={"destructive"}
            className=""
            onClick={() => push("/admin/themes")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateHomeThemeForm;
