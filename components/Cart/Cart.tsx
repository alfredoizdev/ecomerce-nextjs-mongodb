"use client";
import CustomHeader from "@/components/shared/CustomHeader";
import SubTitle from "@/components/shared/SubTitle";
import useCarCalculations from "@/hooks/useCartCalculations";

import Link from "next/link";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const {
    cart,
    calculateDiscountedPrice,
    handleQuantityChange,
    calculateTotal,
    calculateTotalSavings,
    removeFromCart,
  } = useCarCalculations();

  return (
    <div className="bg-gray-100 min-h-screen">
      <CustomHeader title="Cart" />
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
        <div className="pb-3">
          <SubTitle text="Review your selected products and proceed to checkout." />
        </div>
        {cart.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  calculateDiscountedPrice={calculateDiscountedPrice}
                  handleQuantityChange={handleQuantityChange}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
            <OrderSummary
              calculateTotal={calculateTotal}
              calculateTotalSavings={calculateTotalSavings}
            />
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
};

export default Cart;
