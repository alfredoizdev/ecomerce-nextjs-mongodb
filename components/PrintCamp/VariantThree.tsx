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

const VariantThree = ({ campaings }: Props) => {
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
      <div className="mx-auto grid gap-6 px-4 md:px-8 lg:px-16 pt-6 grid-cols-1 lg:grid-cols-4 lg:grid-rows-2">
        <div className="grid grid-cols-1 gap-6 lg:col-span-2 lg:row-span-2">
          {campaings.slice(0, 2).map((camp) => {
            const countdown = calculateTimeLeft(camp.endDate, currentTime);
            return (
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
        <div className="grid grid-cols-1 gap-6 lg:col-span-2 lg:row-span-2">
          {campaings.slice(2, 3).map((camp) => {
            const countdown = calculateTimeLeft(camp.endDate, currentTime);
            return (
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
                    <h3 className="text-4xl font-bold uppercase">
                      {camp.title}
                    </h3>
                    <p className="mt-2 text-md">{camp.description}</p>
                  </div>
                  <CountDown countdown={countdown} />
                  {/* {countdown && (
                    <div>
                      <h2>Deal Ends</h2>
                      <div className="mt-4 flex flex-row justify-between items-center text-lg font-semibold ">
                        <div className="p-3 border-2 rounded-md border-gray-200 min-h-20 min-w-20 text-center flex items-center justify-center">
                          {countdown.days}d
                        </div>
                        <div className="p-3 border-2 rounded-md border-gray-200 min-h-20 min-w-20 text-center flex items-center justify-center">
                          {countdown.hours}h
                        </div>
                        <div className="p-3 border-2 rounded-md border-gray-200 min-h-20 min-w-20 text-center flex items-center justify-center">
                          {countdown.minutes}m
                        </div>
                        <div className="p-3 border-2 rounded-md border-gray-200 min-h-20 min-w-20 text-center flex items-center justify-center">
                          {countdown.seconds}s
                        </div>
                      </div>
                    </div>
                  )} */}
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
      </div>
    </section>
  );
};

export default VariantThree;
