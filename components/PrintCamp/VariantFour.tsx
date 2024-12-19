"use client";
import useMount from "@/hooks/useMount";
import { TCamp } from "@/types/Camp";
import { calculateTimeLeft } from "@/utils/date";
import { hexToLightenRgbaGradient } from "@/utils/theme";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountDown from "../CountDown/CountDown";

type Props = {
  campaings: TCamp[];
};

const VariantFour = ({ campaings }: Props) => {
  const { isMounted } = useMount();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="py-6">
      <div className="mx-auto grid gap-6 px-4 md:px-8 lg:px-16 pt-6 grid-cols-4 auto-rows-fr">
        {campaings.map((camp, index) => {
          const countdown = calculateTimeLeft(camp.endDate, currentTime);
          return (
            <div
              style={{
                background: hexToLightenRgbaGradient(camp.color, 10),
              }}
              key={camp.id}
              className={`relative text-white rounded-lg shadow-lg overflow-hidden ${
                index === 0
                  ? "col-span-2 row-span-1"
                  : index === 1
                  ? "col-span-2 row-span-1"
                  : index === 2
                  ? "col-span-4 row-span-2"
                  : "col-span-4 row-span-1"
              }`}
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
                <CountDown countdown={countdown} />
                <Link
                  href={camp.page}
                  className="inline-block mt-4 text-md font-semibold text-teal-200 hover:underline"
                >
                  View All Collection
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default VariantFour;
