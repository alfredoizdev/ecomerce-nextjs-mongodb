"use client";

import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { Session } from "@/types/Session";
import { THEME_DEFAULT } from "@/constants/theme";

type Props = {
  session?: Session;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBannerImage?: string;
  textBtn?: string;
  backgroundBtn?: string;
  heroColorTitle?: string;
  heroColorSubtitle?: string;
  navbarColor?: string;
  navbarTextColor?: string;
};

const Hero = ({
  session,
  heroTitle,
  heroBannerImage,
  heroSubtitle,
  textBtn,
  backgroundBtn,
  heroColorTitle,
  heroColorSubtitle,
  navbarColor,
  navbarTextColor,
}: Props) => {
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
      <Navbar
        theme={{
          textBtn: textBtn || THEME_DEFAULT.textBtn,
          backgroundBtn: backgroundBtn || THEME_DEFAULT.backgroundBtn,
          navbarColor: navbarColor || THEME_DEFAULT.navbarColor,
          navbarTextColor: navbarTextColor || THEME_DEFAULT.navbarTextColor,
        }}
        session={session}
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          transform: `translateY(${offsetY * 0.5}px)`,
          backgroundImage: `url(${
            heroBannerImage || THEME_DEFAULT.heroBannerImage
          })`,
        }}
      ></div>

      {/* Velo Opaco */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* COPY */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
          <div className="max-w-2xl space-y-4">
            <h2
              className="text-5xl lg:text-6xl font-extrabold uppercase leading-tight"
              style={{
                color: `${heroColorTitle || THEME_DEFAULT.heroColorTitle}`,
              }}
            >
              {heroTitle || "Step Up Your Style"}
            </h2>
            <p
              className="text-lg lg:text-xl leading-tight"
              style={{
                color: `${
                  heroColorSubtitle || THEME_DEFAULT.heroColorSubtitle
                }`,
              }}
            >
              {heroSubtitle ||
                "  Discover unmatched comfort and elegance. Walk boldly into thefuture."}
            </p>
            <Button
              style={{
                color: `${textBtn || THEME_DEFAULT.textBtn}`,
                backgroundColor: `${
                  backgroundBtn || THEME_DEFAULT.backgroundBtn
                }`,
              }}
              className="transition-all"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
