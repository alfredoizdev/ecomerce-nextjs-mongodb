"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Product } from "@/types/Product";

type Props = {
  product: Product;
};

const ProductActions = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items ${product.name} to the cart`);
  };

  const handleBuyNow = () => {
    console.log(`Bought ${quantity} items ${product.name}`);
  };

  return (
    <>
      {/* Quantity Controls */}
      <div className="mt-6 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
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
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <Button
          variant={"default"}
          className="px-6 py-3"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button
          variant="destructive"
          className="px-6 py-3"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
