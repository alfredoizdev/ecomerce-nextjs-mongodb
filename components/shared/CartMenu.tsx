"use client";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";

const CartMenu = () => {
  const { cart } = useCartStore((state) => state);

  return (
    <div className="relative">
      <Link href="/cart">
        <Image src="/icons/cart.svg" alt="Cart" width={24} height={24} />
      </Link>
      {cart.length !== 0 && (
        <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cart.length}
        </span>
      )}
    </div>
  );
};

export default CartMenu;
