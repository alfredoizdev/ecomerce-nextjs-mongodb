import { THEME_DEFAULT } from "@/constants/theme";
import Link from "next/link";

type OrderSummaryProps = {
  calculateTotal: number;
  calculateTotalSavings: number;
  backgroundBtn?: string;
  textBtn?: string;
  text?: string;
  cardColor?: string;
};

const OrderSummary = ({
  calculateTotal,
  calculateTotalSavings,
  backgroundBtn,
  textBtn,
  cardColor,
  text,
}: OrderSummaryProps) => {
  return (
    <div
      className="mt-10 p-6 rounded-lg shadow-md"
      style={{
        backgroundColor: `${cardColor || THEME_DEFAULT.cardColor}`,
      }}
    >
      <h3
        className="text-xl font-bold"
        style={{ color: text || THEME_DEFAULT.text }}
      >
        Order Summary
      </h3>
      <div className="mt-4 flex items-center justify-between">
        <p
          style={{
            color: `${text || THEME_DEFAULT.text}`,
          }}
        >
          Total:
        </p>
        <p
          className="text-lg font-semibold"
          style={{ color: text || THEME_DEFAULT.text }}
        >
          ${calculateTotal.toFixed(2)}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p
          style={{
            color: `${text || THEME_DEFAULT.text}`,
          }}
        >
          Total Savings:
        </p>
        <p className="text-lg font-semibold text-green-600">
          ${calculateTotalSavings.toFixed(2)}
        </p>
      </div>
      <button
        style={{
          backgroundColor: `${backgroundBtn || THEME_DEFAULT.backgroundBtn}`,
          color: `${textBtn || THEME_DEFAULT.textBtn}`,
        }}
        className="w-full mt-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
      >
        Proceed to Checkout
      </button>
      <Link href="/products">
        <button className="w-full mt-3 bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default OrderSummary;
