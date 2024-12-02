import { Button } from "@/components/ui/button";
import Image from "next/image";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <section className="relative w-full h-[32rem]">
      <Navbar />
      {/* Imagen de Fondo */}
      <Image
        src="/images/shoes/red/red-banner.webp"
        alt="Great Shoes"
        fill
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
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
