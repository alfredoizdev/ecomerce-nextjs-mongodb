import Image from "next/image";
import { getProductByIdAction } from "@/actions/products";
import ProductActions from "@/components/ProductActions/ProductActions";
import NotFoundText from "@/components/ui/NotFoundText";
import { calculateDiscountedPrice } from "@/utils/pricing";

type Props = {
  id: string;
};

const ShowProduct = async ({ id }: Props) => {
  const product = await getProductByIdAction(id);

  if (!product) {
    return <NotFoundText text="Product Not Found" />;
  }

  // Calcula el precio con descuento
  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage
  );

  return (
    <section className="max-w-5xl mx-auto py-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative w-full h-96 bg-white shadow-md rounded-lg">
          {product.discountPercentage !== 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded z-10">
              {product.discountPercentage}% OFF
            </div>
          )}
          <Image
            src={product.image}
            alt={product.alt}
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover", borderRadius: "0.5rem" }}
          />
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Precios */}
          <div className="mt-6">
            {discountedPrice ? (
              <div>
                <p className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-2xl font-semibold text-red-600">
                  ${discountedPrice}
                </p>
              </div>
            ) : (
              <p className="text-2xl font-semibold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>

          {/* Additional Details */}
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>
              <strong>Material:</strong> {product.details.material}
            </li>
            <li>
              <strong>Sole:</strong> {product.details.sole}
            </li>
            <li>
              <strong>Weight:</strong> {product.details.weight}
            </li>
            <li>
              <strong>Colors:</strong> {product.details.colors.join(", ")}
            </li>
            <li>
              <strong>Available Sizes:</strong>{" "}
              {product.details.sizes.join(", ")}
            </li>
          </ul>

          {/* Quantity Selector */}
          <ProductActions product={product} />
        </div>
      </div>
    </section>
  );
};

export default ShowProduct;
