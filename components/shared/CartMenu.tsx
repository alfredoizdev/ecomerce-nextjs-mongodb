"use client";
import { THEME_DEFAULT } from "@/constants/theme";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";

type Props = {
  backgroundBtn?: string;
  textBtn?: string;
};

const CartMenu = ({ backgroundBtn, textBtn }: Props) => {
  const { cart } = useCartStore((state) => state);

  return (
    <div className="relative">
      <Link className="text-lg" href="/cart">
        <Image src="/icons/cart.svg" alt="Cart" width={24} height={24} />
      </Link>
      {cart.length !== 0 && (
        <span
          style={{
            backgroundColor: `${backgroundBtn || THEME_DEFAULT.backgroundBtn}`,
            color: `${textBtn || THEME_DEFAULT.textBtn}`,
          }}
          className="absolute -top-3 -right-3 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
        >
          {cart.length}
        </span>
      )}
    </div>
  );
};

export default CartMenu;
