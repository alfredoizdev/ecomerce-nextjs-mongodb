"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full h-[32rem] overflow-hidden">
      <Navbar />
      <Image
        src="/images/shoes/red/red-banner.webp"
        alt="Great Shoes"
        fill
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          transform: `translateY(${offsetY * 0.5}px)`,
          backgroundImage: "url('/images/shoes/red/red-banner.webp')",
        }}
      ></div>

      {/* Velo Opaco */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* COPY */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
          <div className="max-w-2xl text-white space-y-4">
            <h2 className="text-5xl lg:text-6xl font-extrabold uppercase leading-tight">
              Step Up Your Style
            </h2>
            <p className="text-lg lg:text-xl leading-tight">
              Discover unmatched comfort and elegance. Walk boldly into the
              future.
            </p>
            <Button variant={"destructive"} className="transition-all">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
