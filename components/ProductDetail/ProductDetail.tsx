"use client";
import { Button } from "../ui/button";
import useProductDetails from "@/hooks/useProductDetails";
import { Product } from "@/types/Product";

type Props = {
  product: Product;
};

const ProductDetail = ({ product }: Props) => {
  const {
    // handleSelectSize,
    // isSizeSelected,
    // quantity,
    // handleIncrement,
    // handleDecrement,
    handleAddToCart,
    handleSelectSize,
    isSizeSelected,
  } = useProductDetails(product);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold text-gray-900 mb-4">
        ${product.price.toFixed(2)}
      </p>

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

      {/* <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={handleDecrement}
          className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded-lg"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          onClick={handleIncrement}
          className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded-lg"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div> */}

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
