"use client";

import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { createProductAction } from "@/actions/products";
import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UploadImage from "./UploadImage";
import useCreateProductForm from "@/hooks/useCreateProductForm";

const initialState = {
  name: "Blue Snickers",
  description: "Comfortable and stylish blue snickers perfect for casual wear.",
  price: 79.99,
  category: "Running",
  gender: "women",
  discountPercentage: 10,
  material: "Leather",
  sole: "Rubber",
  weight: "500g",
  colors: "Blue, White",
  sizes: "7, 8, 9, 10, 11",
};

const CrateProduct = () => {
  const { push } = useRouter();
  // const [imageUrl, setUrlImage] = useState("");
  const [state, action, isPending] = useActionState(
    createProductAction,
    undefined
  );

  const { formFields, handleOnChange, handleSelectOnChange, setImageUrl } =
    useCreateProductForm(initialState, state);

  // useEffect(() => {
  //   if (imageUrl) {
  //     setFormFields((prevFields) => ({
  //       ...prevFields,
  //       image: imageUrl,
  //     }));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [imageUrl]);

  // useEffect(() => {
  //   if (state?.success) {
  //     resetForm();
  //     toast.success(state.message);
  //     push("/admin/products");
  //   } else {
  //     if (state?.message) {
  //       toast.error(state.message);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state?.message, state?.success]);

  // const [formFields, setFormFields] = useState<ProductFormData>(
  //   state?.data || {
  //     name: "Orange Running Shoes",
  //     description: "This is a test product description.",
  //     price: 99.99,
  //     category: "Running",
  //     colors: "Red, Black, Blue",
  //     discountPercentage: 10,
  //     sizes: "7, 8, 9, 10",
  //     material: "Synthetic",
  //     sole: "Rubber",
  //     weight: "very light 200g",
  //     gender: "man",
  //   }
  // );

  // const handleOnChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value } = e.target;
  //   setFormFields((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSelectOnChange = (value: string, key: string) => {
  //   setFormFields((prevFields) => ({
  //     ...prevFields,
  //     [key]: value,
  //   }));
  // };

  return (
    <div className="w-full">
      <UploadImage setImageUrl={setImageUrl} />
      <form action={action} className="space-y-6">
        {/* Contenedor del formulario con diseño de grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              value={formFields?.material || ""}
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
              value={formFields?.sole || ""}
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
              value={formFields?.discountPercentage || ""}
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
              Colors (comma-separated)
            </Label>
            <Input
              id="colors"
              name="colors"
              placeholder="e.g., Red, Black, Blue"
              value={formFields?.colors || ""}
              onChange={handleOnChange}
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
              Sizes (comma-separated)
            </Label>
            <Input
              id="sizes"
              name="sizes"
              placeholder="e.g., 7, 8, 9, 10"
              value={formFields?.sizes || ""}
              onChange={handleOnChange}
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
              weights (comma-separated)
            </Label>
            <Input
              id="weight"
              name="weight"
              placeholder=" weights e.g., 200g, 300g, 400g"
              value={formFields?.weight || ""}
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
              <span>Save Product</span>
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

export default CrateProduct;
