import Image from "next/image";
import { findProductByIdAction } from "@/actions/products";
import ProductActions from "@/components/ProductActions/ProductActions";
import NotFoundText from "@/components/ui/NotFoundText";
import { calculateDiscountedPrice } from "@/utils/pricing";

type Props = {
  id: string;
};

const ShowProduct = async ({ id }: Props) => {
  const { data } = await findProductByIdAction(id);

  if (!data) {
    return <NotFoundText text="Product Not Found" />;
  }

  // Calcula el precio con descuento
  const discountedPrice = calculateDiscountedPrice(
    data.price,
    data.discountPercentage
  );

  return (
    <section className="max-w-5xl mx-auto py-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative w-full h-96 bg-white shadow-md rounded-lg">
          {data.discountPercentage !== 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded z-10">
              {data.discountPercentage}% OFF
            </div>
          )}
          <Image
            src={data.image}
            alt={data.alt}
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover", borderRadius: "0.5rem" }}
          />
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{data.name}</h2>
          <p className="mt-4 text-gray-600">{data.description}</p>

          {/* Precios */}
          <div className="mt-6">
            {discountedPrice ? (
              <div>
                <p className="text-sm text-gray-500 line-through">
                  ${data.price.toFixed(2)}
                </p>
                <p className="text-2xl font-semibold text-red-600">
                  ${discountedPrice}
                </p>
              </div>
            ) : (
              <p className="text-2xl font-semibold text-gray-900">
                ${data.price.toFixed(2)}
              </p>
            )}
          </div>

          {/* Additional Details */}
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>
              <strong>Material:</strong> {data.details.material}
            </li>
            <li>
              <strong>Sole:</strong> {data.details.sole}
            </li>
            <li>
              <strong>Weight:</strong> {data.details.weight}
            </li>
            <li>
              <strong>Colors:</strong> {data.details.colors.join(", ")}
            </li>
            <li>
              <strong>Available Sizes:</strong> {data.details.sizes.join(", ")}
            </li>
          </ul>

          {/* Quantity Selector */}
          <ProductActions product={data} />
        </div>
      </div>
    </section>
  );
};

export default ShowProduct;
