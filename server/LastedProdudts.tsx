import { getProductsAction } from "@/actions/products";
import NotFoundText from "@/components/ui/NotFoundText";
import { THEME_DEFAULT } from "@/constants/theme";
import Image from "next/image";
import Link from "next/link";

type Props = {
  theme?: {
    backgroundBtn: string;
    textBtn: string;
  };
};

const LastedProducts = async ({ theme }: Props) => {
  const products = await getProductsAction();

  if (!products.length) return <NotFoundText text="Products Not found" />;

  const limitedProducts = products.slice(0, 8);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 lg:px-16 pt-6">
        {limitedProducts.map((product) => (
          <div key={product.id} className="relative group">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              layout="responsive"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity animate-in-out duration-300 hidden md:flex">
              <div className="flex flex-col items-center justify-center text-white">
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
                <Link
                  style={{
                    background:
                      theme?.backgroundBtn || THEME_DEFAULT.backgroundBtn,
                    color: theme?.textBtn || THEME_DEFAULT.textBtn,
                  }}
                  href={`/product/${product.id}`}
                  className="px-4 py-2 rounded-lg"
                >
                  View Product
                </Link>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                width: "100%",
                bottom: "1px",
                background: "#6f6f6f59",
                padding: "10px 0px",
              }}
              className="md:hidden flex flex-col items-center justify-end text-white"
            >
              <p>{product.name}</p>
              <p>${product.price.toFixed(2)}</p>

              <Link
                className="px-4 py-2 mb-3 rounded-lg"
                style={{
                  background:
                    theme?.backgroundBtn || THEME_DEFAULT.backgroundBtn,
                  color: theme?.textBtn || THEME_DEFAULT.textBtn,
                }}
                href={`/product/${product.id}`}
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastedProducts;
