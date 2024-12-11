"use client";

import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { updateProductAction } from "@/actions/products";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/Product";
import useFormHandler from "@/hooks/useHandlerForm";
import UploadImage from "../Dashboard/UploadImage";
import SetImageFromGallery from "../Dashboard/media/SetImageFromGallery";
import ColorSelector from "../Dashboard/ColorSelector";
import SizeSelector from "../Dashboard/SizeSelector";

type Props = {
  product: Product;
};

const EditProduct = ({ product }: Props) => {
  const { push } = useRouter();
  const [state, action, isPending] = useActionState(
    updateProductAction,
    undefined
  );

  const {
    formFields,
    handleOnChange,
    handleSizesChange,
    handleColorChange,
    setImageUrl,
    handleSelectOnChange,
  } = useFormHandler(product, state, {
    onSuccessMessage: "Product updated successfully!",
  });

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full">
        {/* Upload Section */}
        <div className="flex flex-col items-center">
          <UploadImage imageUrl={product.image} setImageUrl={setImageUrl} />
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

      <form action={action} className="space-y-6">
        {/* Contenedor del formulario con diseño de grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="inStock"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              In Stock
            </Label>
            <Select
              name="inStock"
              value={formFields.inStock}
              onValueChange={(value) => handleSelectOnChange(value, "inStock")}
            >
              <SelectTrigger id="inStock" className="w-full">
                <SelectValue placeholder="Status in Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in">In Stock</SelectItem>
                <SelectItem value="out">Out Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Name */}
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter product name"
              value={formFields?.name || ""}
              onChange={handleOnChange}
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-500 mt-1">{state.errors.name}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <Label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter product price"
              value={formFields?.price || ""}
              onChange={handleOnChange}
            />
            {state?.errors?.price && (
              <p className="text-sm text-red-500 mt-1">{state.errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </Label>
            <Select
              name="category"
              value={formFields.category}
              onValueChange={(value) => handleSelectOnChange(value, "category")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Running">Running</SelectItem>
                <SelectItem value="Casual">Casual</SelectItem>
                <SelectItem value="Boots">Boots</SelectItem>
                <SelectItem value="Hiking">Hiking</SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.category && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.category}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <Label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Gender
            </Label>
            <Select
              name="gender"
              value={formFields.gender}
              onValueChange={(value) => handleSelectOnChange(value, "gender")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unisex">Unisex</SelectItem>
                <SelectItem value="man">Man</SelectItem>
                <SelectItem value="women">Women</SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.gender && (
              <p className="text-sm text-red-500 mt-1">{state.errors.gender}</p>
            )}
          </div>

          {/* Material */}
          <div>
            <Label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Material
            </Label>
            <Input
              id="material"
              name="material"
              placeholder="Enter material type"
              value={formFields.details?.material || ""}
              onChange={handleOnChange}
            />
            {state?.errors?.material && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.material}
              </p>
            )}
          </div>

          {/* Sole */}
          <div>
            <Label
              htmlFor="sole"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Sole
            </Label>
            <Input
              id="sole"
              name="sole"
              placeholder="Enter sole material"
              value={formFields.details?.sole || ""}
              onChange={handleOnChange}
            />
            {state?.errors?.sole && (
              <p className="text-sm text-red-500 mt-1">{state.errors.sole}</p>
            )}
          </div>

          {/* Discount Percentage */}
          <div>
            <Label
              htmlFor="discountPercentage"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Discount Percentage
            </Label>
            <Input
              id="discountPercentage"
              name="discountPercentage"
              type="number"
              placeholder="Enter discount percentage"
              value={formFields.discountPercentage}
              onChange={handleOnChange}
            />
            {state?.errors?.discountPercentage && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.discountPercentage}
              </p>
            )}
          </div>

          {/* Colors */}
          <div>
            <Label
              htmlFor="colors"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Colors
            </Label>
            {/* <Input
              id="colors"
              name="colors"
              placeholder="e.g., Red, Black, Blue"
              value={formFields.details.colors}
              onChange={handleOnChange}
            /> */}
            <ColorSelector
              colors={formFields.details?.colors?.split(",")}
              onChange={handleColorChange}
              formValueColors={formFields.details.colors}
            />
            {state?.errors?.colors && (
              <p className="text-sm text-red-500 mt-1">{state.errors.colors}</p>
            )}
          </div>

          {/* Sizes */}
          <div>
            <Label
              htmlFor="sizes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Sizes
            </Label>
            <SizeSelector
              sizes={formFields.details?.sizes?.split(",")} // Inicializa con las tallas existentes
              onChange={handleSizesChange} // Llama a la función para manejar cambios
              formValueSizes={formFields.details.sizes} // Envía las tallas como un string separado por comas
            />
            {state?.errors?.sizes && (
              <p className="text-sm text-red-500 mt-1">{state.errors.sizes}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Weights
            </Label>
            <Input
              id="weight"
              name="weight"
              placeholder=" weights e.g., 200g"
              value={formFields.details.weight}
              onChange={handleOnChange}
            />
            {state?.errors?.weight && (
              <p className="text-sm text-red-500 mt-1">{state.errors.weight}</p>
            )}
          </div>
        </div>
        {/* Description */}
        <div className="col-span-1 md:col-span-2">
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </Label>
          <input
            hidden={true}
            name="image"
            value={formFields?.image || ""}
            onChange={handleOnChange}
          />
          <input
            hidden={true}
            name="publicImageId"
            value={formFields?.publicImageId || ""}
            onChange={handleOnChange}
          />
          <input
            hidden={true}
            name="id"
            value={formFields?.id || ""}
            onChange={handleOnChange}
          />
          <Textarea
            placeholder="Type your message here."
            name="description"
            id="description"
            value={formFields?.description || ""}
            onChange={handleOnChange}
          />
          {state?.errors?.description && (
            <p className="text-sm text-red-500 mt-1">
              {state.errors.description}
            </p>
          )}
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
              <span>Update Product</span>
            )}
          </Button>
          <Button
            type="button"
            variant={"destructive"}
            className=""
            onClick={() => push("/admin/products")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
