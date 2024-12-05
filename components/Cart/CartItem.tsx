import Image from "next/image";

const CartItem = ({
  item,
  calculateDiscountedPrice,
  handleQuantityChange,
  removeFromCart,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  calculateDiscountedPrice: (
    price: number,
    discountPercentage: number
  ) => number;
  handleQuantityChange: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
}) => {
  const discountedPrice = calculateDiscountedPrice(
    item.price,
    item.discountPercentage || 0
  );
  const totalItemPrice = discountedPrice * item.quantity;

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
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
            {item.discountPercentage > 0 ? (
              <>
                <span className="line-through text-gray-500">
                  ${item.price.toFixed(2)}
                </span>{" "}
                <span className="text-red-600">
                  ${discountedPrice.toFixed(2)} each
                </span>
              </>
            ) : (
              `$${item.price.toFixed(2)} each`
            )}
          </p>
          <button
            onClick={() => removeFromCart(item.id || "")}
            className="text-red-500 text-sm mt-2 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.id || "", -1)}
            className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded-lg"
          >
            -
          </button>
          <span className="text-lg font-semibold">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.id || "", 1)}
            className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded-lg"
          >
            +
          </button>
        </div>
        <p className="text-lg font-semibold">${totalItemPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
