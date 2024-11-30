"use client";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CustomCard = ({ id, alt, description, image, name, price }: Product) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <div className="mt-5">
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={alt}
            width={300}
            height={200}
            className="mx-auto rounded-md"
          />
        </Link>
      </div>
      <h3 className="mt-4 text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="mt-2 font-semibold">${price}</p>
      <Button variant={"default"} className="mt-4" onClick={handleClick}>
        Buy Now
      </Button>
    </div>
  );
};

export default CustomCard;
