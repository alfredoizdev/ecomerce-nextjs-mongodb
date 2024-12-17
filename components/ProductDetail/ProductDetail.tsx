"use client";
import { Button } from "../ui/button";
import useProductDetails from "@/hooks/useProductDetails";
import { Product } from "@/types/Product";

type Props = {
  product: Product;
};

const ProductDetail = ({ product }: Props) => {
  const { handleAddToCart, handleSelectSize, isSizeSelected } =
    useProductDetails(product);

  return (
    <div className="pt-3">
      <p className="text-gray-700 mb-4">{product.description}</p>
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

      <button
        onClick={handleAddToCart}
        className="bg-black text-white px-4 py-2 rounded mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
