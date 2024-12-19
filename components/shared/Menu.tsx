"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { getGendersAction } from "@/actions/gender";

import { THEME_DEFAULT } from "@/constants/theme";

import { DTOGender } from "@/types/Gender";

type Props = {
  color?: string;
  fontSizes?: "md" | "lg";
};

const Menu = ({ color, fontSizes = "lg" }: Props) => {
  const [menu, setMenu] = useState<DTOGender[]>();

  useEffect(() => {
    const getMenu = async () => {
      const { data } = await getGendersAction();
      setMenu(data || []);
    };

    getMenu();
  }, []);

  if (!menu) return null;

  return (
    <>
      <Link
        style={{
          color: color || THEME_DEFAULT.navbarTextColor,
        }}
        className={`${fontSizes === "lg" ? "text-2xl" : "text-lg"} uppercase`}
        href="/"
      >
        Home
      </Link>
      {menu.map((gender) => (
        <Link
          style={{
            color: color || THEME_DEFAULT.navbarTextColor,
          }}
          key={gender.id}
          className={`${fontSizes === "lg" ? "text-2xl" : "text-lg"} uppercase`}
          href={`collections/${gender.name.toLocaleLowerCase()}`}
        >
          {gender.name}
        </Link>
      ))}
    </>
  );
};

export default Menu;
