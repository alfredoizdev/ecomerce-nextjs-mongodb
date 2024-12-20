"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { THEME_DEFAULT } from "@/constants/theme";

import { getCategoryAction } from "@/actions/category";
import { DTOCategory } from "@/types/Category";
import useMobileMenu from "@/hooks/useMobileMenu";

type Props = {
  color?: string;
  fontSizes?: "md" | "lg";
};

const Menu = ({ color, fontSizes = "lg" }: Props) => {
  const [menu, setMenu] = useState<DTOCategory[]>();
  const { toggleMobileMenu } = useMobileMenu();

  useEffect(() => {
    const getMenu = async () => {
      const { data } = await getCategoryAction();
      setMenu(data || []);
    };

    getMenu();
  }, []);

  if (!menu) return null;

  return (
    <>
      <Link
        onClick={toggleMobileMenu}
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
          onClick={toggleMobileMenu}
          style={{
            color: color || THEME_DEFAULT.navbarTextColor,
          }}
          key={gender.id}
          className={`${fontSizes === "lg" ? "text-2xl" : "text-lg"} uppercase`}
          href={`/collections/${gender.category.toLocaleLowerCase()}`}
        >
          {gender.category}
        </Link>
      ))}
    </>
  );
};

export default Menu;
