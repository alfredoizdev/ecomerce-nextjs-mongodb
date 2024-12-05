import Link from "next/link";

type OrderSummaryProps = {
  calculateTotal: number;
  calculateTotalSavings: number;
};

const OrderSummary = ({
  calculateTotal,
  calculateTotalSavings,
}: OrderSummaryProps) => {
  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">Order Summary</h3>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-gray-600">Total:</p>
        <p className="text-lg font-semibold">${calculateTotal.toFixed(2)}</p>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-gray-600">Total Savings:</p>
        <p className="text-lg font-semibold text-green-600">
          ${calculateTotalSavings.toFixed(2)}
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
  );
};

export default OrderSummary;
