import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
};

const CollageProduct = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item) => (
        <Link
          key={item.id}
          href={`/product/${item.id}`}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative w-full h-48">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              style={{ objectFit: "cover", borderRadius: "0.5rem" }}
            />
          </div>
          <h4 className="mt-4 text-lg font-bold text-gray-800">{item.name}</h4>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="mt-2 font-semibold text-gray-900">
            ${item.price.toFixed(2)}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default CollageProduct;
