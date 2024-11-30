"use client";
import CustomHeader from "@/components/shared/CustomHeader/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const initialCart = [
  {
    id: 1,
    name: "Red Running Shoes",
    price: 79.99,
    quantity: 1,
    image: "/images/shoes/product/r1.webp",
    alt: "Red Running Shoes",
  },
  {
    id: 2,
    name: "Blue Sports Shoes",
    price: 89.99,
    quantity: 2,
    image: "/images/shoes/product/b1.webp",
    alt: "Blue Sports Shoes",
  },
  {
    id: 3,
    name: "Black Casual Shoes",
    price: 69.99,
    quantity: 1,
    image: "/images/shoes/product/bs1.webp",
    alt: "Black Casual Shoes",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const handleQuantityChange = (id: number, delta: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity + delta > 0
        ? { ...item, quantity: item.quantity + delta }
        : item
    );
    setCart(updatedCart);
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <CustomHeader
        title="Cart"
        subtext="Review your selected products and proceed to checkout."
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
        {cart.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="grid grid-cols-1 gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-24 h-24">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} each
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 text-sm mt-2 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded-lg"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Order Summary</h3>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-gray-600">Total:</p>
                <p className="text-lg font-semibold">
                  ${calculateTotal().toFixed(2)}
                </p>
              </div>
              <button className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Proceed to Checkout
              </button>
              <Link href="/products">
                <button className="w-full mt-3 bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-gray-600 mt-2">
              Looks like you haven’t added anything to your cart yet.
            </p>
            <Link href="/products">
              <button className="mt-6 bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Shop Now
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
