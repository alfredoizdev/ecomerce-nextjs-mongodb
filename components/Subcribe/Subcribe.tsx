"use client";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { THEME_DEFAULT } from "@/constants/theme";
import { darkenColor } from "@/utils/theme";
import { useEffect, useState } from "react";

type Props = {
  textBtn?: string;
  backgroundBtn?: string;
  text?: string;
};

const Subcribe = ({ textBtn, backgroundBtn, text }: Props) => {
  const [mount, setMount] = useState(false);
  const titleColor = darkenColor(text || THEME_DEFAULT.text, 20);

  useEffect(() => {
    setMount(true);

    return () => {
      setMount(false);
    };
  }, []);

  if (!mount) {
    return null;
  }

  return (
    <div className="flex justify-center flex-col items-center ">
      <p style={{ color: `${text || THEME_DEFAULT.text}` }}>Join our</p>
      <h2
        className="text-3xl font-semibold uppercase"
        style={{ color: titleColor }}
      >
        Newsletters now!
      </h2>
      <div className="py-3 w-full flex justify-center items-center">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="email"
            placeholder="Email"
            style={{ background: "#e6e3e3" }}
          />
          <Button
            style={{
              background: `${backgroundBtn || THEME_DEFAULT.backgroundBtn}`,
              color: `${textBtn || THEME_DEFAULT.textBtn}`,
            }}
            type="submit"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Subcribe;
