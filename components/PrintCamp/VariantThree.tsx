import { TCamp } from "@/types/Camp";
import { hexToLightenRgbaGradient } from "@/utils/theme";
import Image from "next/image";
import Link from "next/link";

type Props = {
  campaings: TCamp[];
};

const VariantThree = ({ campaings }: Props) => {
  return (
    <section className="py-6">
      <div className="mx-auto grid gap-6 px-4 md:px-8 lg:px-16 pt-6 grid-cols-1 lg:grid-cols-4 lg:grid-rows-2">
        <div className="grid grid-cols-1 gap-6 lg:col-span-2 lg:row-span-2">
          {campaings.slice(0, 2).map((camp) => (
            <div
              key={camp.id}
              style={{
                background: hexToLightenRgbaGradient(camp.color, 10),
              }}
              className="relative text-white rounded-lg shadow-lg overflow-hidden min-h-56"
            >
              <div className="absolute inset-0">
                <Image
                  src={camp.image}
                  alt={camp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="opacity-40"
                />
              </div>
              <div className="relative p-6">
                <h3 className="text-4xl font-bold uppercase">{camp.title}</h3>
                <p className="mt-2 text-md">{camp.description}</p>
                <Link
                  href={camp.page}
                  className="inline-block mt-4 text-md font-semibold text-teal-200 hover:underline"
                >
                  View All Collection
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:col-span-2 lg:row-span-2">
          {campaings.slice(2, 3).map((camp) => (
            <div
              key={camp.id}
              style={{
                background: hexToLightenRgbaGradient(camp.color, 10),
              }}
              className="relative text-white rounded-lg shadow-lg overflow-hidden min-h-56 h-full"
            >
              <div className="absolute inset-0">
                <Image
                  src={camp.image}
                  alt={camp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="opacity-40"
                />
              </div>
              <div className="relative p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-4xl font-bold uppercase">{camp.title}</h3>
                  <p className="mt-2 text-md">{camp.description}</p>
                </div>
                <Link
                  href={camp.page}
                  className="inline-block mt-4 text-md font-semibold text-teal-200 hover:underline"
                >
                  View All Collection
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VariantThree;
