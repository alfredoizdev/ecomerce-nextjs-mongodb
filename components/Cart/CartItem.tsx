import { THEME_DEFAULT } from "@/constants/theme";
import Image from "next/image";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  calculateDiscountedPrice: (
    price: number,
    discountPercentage: number
  ) => number;
  handleQuantityChange: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  text?: string;
  cardColor?: string;
  textBtn?: string;
  backgroundBtn?: string;
};

const CartItem = ({
  item,
  calculateDiscountedPrice,
  handleQuantityChange,
  removeFromCart,
  text,
  cardColor,
  textBtn,
  backgroundBtn,
}: Props) => {
  const discountedPrice = calculateDiscountedPrice(
    item.price,
    item.discountPercentage || 0
  );
  const totalItemPrice = discountedPrice * item.quantity;

  return (
    <div
      className="flex items-center justify-between p-4 rounded-lg shadow-md"
      style={{
        backgroundColor: `${cardColor || THEME_DEFAULT.cardColor}`,
      }}
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
          <h2
            className="text-lg font-semibold"
            style={{ color: `${text || THEME_DEFAULT.text}` }}
          >
            {item.name}
          </h2>
          <p
            className="text-sm"
            style={{ color: `${text || THEME_DEFAULT.text}` }}
          >
            {item.discountPercentage > 0 ? (
              <>
                <span
                  className="line-through"
                  style={{ color: `${text || THEME_DEFAULT.text}` }}
                >
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
            style={{
              color: `${textBtn || THEME_DEFAULT.textBtn}`,
              backgroundColor: `${
                backgroundBtn || THEME_DEFAULT.backgroundBtn
              }`,
            }}
            onClick={() => handleQuantityChange(item.id || "", -1)}
            className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded-lg"
          >
            -
          </button>
          <span
            className="text-lg font-semibold"
            style={{ color: `${text || THEME_DEFAULT.text}` }}
          >
            {item.quantity}
          </span>
          <button
            style={{
              color: `${textBtn || THEME_DEFAULT.textBtn}`,
              backgroundColor: `${
                backgroundBtn || THEME_DEFAULT.backgroundBtn
              }`,
            }}
            onClick={() => handleQuantityChange(item.id || "", 1)}
            className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded-lg"
          >
            +
          </button>
        </div>
        <p
          className="text-lg font-semibold"
          style={{ color: `${text || THEME_DEFAULT.text}` }}
        >
          ${totalItemPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
