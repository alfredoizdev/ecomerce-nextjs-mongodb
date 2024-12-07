import Link from "next/link";
import Image from "next/image";

const Camp = () => {
  return (
    <section className="py-6">
      <div className="mx-auto grid gap-6 px-4 md:px-8 lg:px-16 pt-6">
        {/* First Row: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="relative bg-gradient-to-r from-teal-700 to-teal-900 text-white rounded-lg shadow-lg overflow-hidden min-h-56">
            <div className="absolute inset-0">
              <Image
                src="/images/shoes/product/glass.webp"
                alt="New Wing Sunglasses"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="opacity-40"
              />
            </div>
            <div className="relative p-6">
              <h3 className="text-4xl font-bold uppercase">
                New Wing Sunglasses
              </h3>
              <p className="mt-2 text-sm">
                &quot;A single day at Sportwear. Save off 20% for all
                products.&quot;
              </p>
              <Link
                href="/collection"
                className="inline-block mt-4 text-sm font-semibold text-teal-200 hover:underline"
              >
                View All Collection
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-gradient-to-r from-indigo-700 to-indigo-900 text-white rounded-lg shadow-lg overflow-hidden min-h-56">
            <div className="absolute inset-0">
              <Image
                src="/images/shoes/product/jacket.webp"
                alt="Jacket & Coats 2018"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="opacity-40"
              />
            </div>
            <div className="relative p-6">
              <h3 className="text-4xl font-bold uppercase">
                Jacket & Coats 2018
              </h3>
              <p className="mt-2 text-sm">
                Look real. Define yourself. Add intensity. Be quick to receive
                the best deals of the store.
              </p>
              <Link
                href="/collection"
                className="inline-block mt-4 text-sm font-semibold text-indigo-200 hover:underline"
              >
                View All Collection
              </Link>
            </div>
          </div>
        </div>

        {/* Second Row: Large Card for Air Jordan */}
        <div className="relative bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg shadow-lg overflow-hidden h-72">
          <div className="absolute inset-0">
            <Image
              src="/images/shoes/product/jordan.webp"
              alt="Air Jordan 32"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="opacity-40"
            />
          </div>
          <div className="relative p-8 text-center">
            <h3 className="text-4xl font-bold uppercase">Air Jordan 32</h3>
            <p className="mt-2 text-sm">
              Discount 10% for all customers booked before{" "}
              <span className="font-bold">02/14/2018</span>.
            </p>
            <Link
              href="/collection"
              className="inline-block mt-4 text-sm font-semibold text-gray-200 hover:underline"
            >
              View All Collection
            </Link>
          </div>
        </div>

        {/* Third Row: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 3 */}
          <div className="relative bg-gradient-to-r from-pink-700 to-pink-900 text-white rounded-lg shadow-lg overflow-hidden min-h-56">
            <div className="absolute inset-0">
              <Image
                src="/images/shoes/product/tr.webp"
                alt="New Trending 2018"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="opacity-40"
              />
            </div>
            <div className="relative p-6">
              <h3 className="text-4xl font-bold uppercase">
                New Trending 2018
              </h3>
              <p className="mt-2 text-sm">
                Use code <span className="font-bold">&quot;SNEAKER&quot;</span>{" "}
                to shopx online and save off 30% for all products.
              </p>
              <Link
                href="/collection"
                className="inline-block mt-4 text-sm font-semibold text-pink-200 hover:underline"
              >
                View All Collection
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg shadow-lg overflow-hidden min-h-56">
            <div className="absolute inset-0">
              <Image
                src="/images/shoes/product/camp.webp"
                alt="Explore Campaign"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="opacity-40"
              />
            </div>
            <div className="relative p-6">
              <h3 className="text-4xl font-bold uppercase">Explore Campaign</h3>
              <p className="mt-2 text-sm">
                The Holiday 2018 Nike Tech Fleece Aeroloft Collection will
                ensure you never get cold again.
              </p>
              <Link
                href="/collection"
                className="inline-block mt-4 text-sm font-semibold text-blue-200 hover:underline"
              >
                View All Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Camp;
