"use client";

import { THEME_DEFAULT } from "@/constants/theme";
import useMobileMenu from "@/hooks/useMobileMenu";

type Props = {
  navbarTextColor?: string;
};

const MobileButtonMenu = ({ navbarTextColor }: Props) => {
  const { toggleMobileMenu } = useMobileMenu();
  return (
    <button
      className="text-white focus:outline-none"
      onClick={toggleMobileMenu}
    >
      {/* Icon for mobile menu */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          color={navbarTextColor || THEME_DEFAULT.navbarTextColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
  );
};

export default MobileButtonMenu;
