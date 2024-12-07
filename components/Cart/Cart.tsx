"use client";
import CustomHeader from "@/components/shared/CustomHeader";
import SubTitle from "@/components/shared/SubTitle";
import useCarCalculations from "@/hooks/useCartCalculations";

import Link from "next/link";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { Session } from "@/types/Session";
import { THEME_DEFAULT } from "@/constants/theme";

type Props = {
  session?: Session;
  theme?: {
    text: string;
    backgroundBtn: string;
    textBtn: string;
    heroTitle: string;
    heroSubtitle: string;
    heroBannerImage: string;
    heroColorSubtitle: string;
    heroColorTitle: string;
    cardColor: string;
    footerBackgroundColor: string;
    footerColorTitle: string;
    footerColorText: string;
    background: string;
  };
};

const Cart = ({ session, theme }: Props) => {
  const {
    cart,
    calculateDiscountedPrice,
    handleQuantityChange,
    calculateTotal,
    calculateTotalSavings,
    removeFromCart,
  } = useCarCalculations();

  return (
    <div
      className=" min-h-screen"
      style={{ background: `${theme?.background || THEME_DEFAULT.background}` }}
    >
      <CustomHeader theme={theme} title="Cart" session={session} />
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
        <div className="pb-3">
          <SubTitle
            textColor={theme?.text}
            text="Review your selected products and proceed to checkout."
          />
        </div>
        {cart.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6">
              {cart.map((item) => (
                <CartItem
                  {...theme}
                  key={item.id}
                  item={item}
                  calculateDiscountedPrice={calculateDiscountedPrice}
                  handleQuantityChange={handleQuantityChange}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
            <OrderSummary
              {...theme}
              calculateTotal={calculateTotal}
              calculateTotalSavings={calculateTotalSavings}
            />
          </>
        ) : (
          <div
            className="text-center py-20"
            style={{ color: theme?.text || THEME_DEFAULT.text }}
          >
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="mt-2">
              Looks like you haven’t added anything to your cart yet.
            </p>
            <Link href="/products">
              <button
                style={{
                  backgroundColor:
                    theme?.backgroundBtn || THEME_DEFAULT.backgroundBtn,
                  color: theme?.textBtn || THEME_DEFAULT.textBtn,
                }}
                className="mt-6 py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
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
