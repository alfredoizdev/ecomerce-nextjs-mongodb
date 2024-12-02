"use client";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/Product";

type Props = {
  product: Product;
};

const ProductDetail = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore((state) => state);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleAddToCart = () => {
    const newProduct = { ...product, quantity };
    addToCart(newProduct);
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>

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
