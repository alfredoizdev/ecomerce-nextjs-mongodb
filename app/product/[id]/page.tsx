import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import CustomHeader from "@/components/shared/CustomHeader/CustomHeader";
import CollageProduct from "@/components/CollageProduct/CollageProduct";
import ProductActions from "@/components/ProductActions/ProductActions";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const product = PRODUCTS.find((product) => product.id === Number(id));

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <CustomHeader title="Product Details" />

      {/* Product Details Section */}
      <section className="max-w-5xl mx-auto py-10 px-4 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative w-full h-96 bg-white shadow-md rounded-lg">
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
            <p className="mt-6 text-2xl font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </p>

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

        {/* Collage Section */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            You may also like
          </h3>
          <CollageProduct
            products={PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)}
          />
        </section>
      </section>
    </>
  );
};

export default ProductPage;
