"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import { calculateDiscountedPrice } from "@/utils/pricing";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CustomCard = ({
  id,
  alt,
  description,
  image,
  name,
  price,
  discountPercentage = 0,
  inStock,
}: Product) => {
  const router = useRouter();

  const handleClick = () => {
    if (inStock === "in") {
      router.push(`/product/${id}`);
    }
  };

  const discountedPrice = calculateDiscountedPrice(price, discountPercentage);

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md text-center">
      {/* Badge de descuento */}
      {discountPercentage > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Badge de fuera de stock */}
      {inStock === "out" && (
        <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-bold py-1 px-2 rounded">
          Out of Stock
        </div>
      )}

      {/* Imagen del producto con efecto de hover */}
      <div className="mt-5 group">
        <Link href={inStock === "in" ? `/product/${id}` : "#"}>
          <div className="relative overflow-hidden rounded-md">
            <Image
              src={image}
              alt={alt}
              width={300}
              height={200}
              className={`mx-auto rounded-md transform transition-transform duration-300 ${
                inStock === "in" ? "group-hover:scale-105" : "opacity-50"
              }`}
            />
          </div>
        </Link>
      </div>

      {/* Información del producto */}
      <h3 className="mt-4 text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>

      {/* Precios */}
      <div className="mt-2">
        {discountedPrice ? (
          <div>
            <p className="text-sm text-gray-500 line-through">${price}</p>
            <p className="text-lg font-semibold text-red-600">
              ${discountedPrice}
            </p>
          </div>
        ) : (
          <p className="text-lg font-semibold">${price}</p>
        )}
      </div>

      {/* Botón */}
      <Button
        variant={"default"}
        className="mt-4"
        onClick={handleClick}
        disabled={inStock === "out"} // Desactivar si está fuera de stock
      >
        {inStock === "out" ? "Unavailable" : "Buy Now"}
      </Button>
    </div>
  );
};

export default CustomCard;
