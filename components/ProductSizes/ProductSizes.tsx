"use client";
import { Button } from "../ui/button";
import useHandleSizes from "@/hooks/useHandleSizes";
import { Product } from "@/types/Product";

type Props = {
  product: Product;
};

const ProductSizes = ({ product }: Props) => {
  const { handleSelectSize, isSizeSelected } = useHandleSizes(product);

  return (
    <div className="my-3">
      <strong>Available Sizes:</strong>
      <div className="w-full flex flex-row justify-center md:justify-start items-center flex-wrap">
        {product.details.sizes.split(",").map((sizeOption: string) => (
          <Button
            key={sizeOption}
            type="button"
            onClick={() => handleSelectSize(sizeOption)}
            className={`m-1 ${
              isSizeSelected(sizeOption)
                ? "bg-red-700 text-white hover:bg-red-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {sizeOption}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizes;
