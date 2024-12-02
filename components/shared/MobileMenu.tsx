"use client";
import Link from "next/link";
import { MENU } from "@/constants/menu";
import useMobileMenu from "@/hooks/useMobileMenu";

const MobileMenu = () => {
  const { isMobileMenuOpen, toggleMobileMenu, isVisible } = useMobileMenu();

  if (!isMobileMenuOpen && !isVisible) return null;

  return (
    <div
      className={`fixed w-full h-full bg-black z-20 p-5 md:hidden transition-opacity duration-300 ${
        isMobileMenuOpen && isVisible
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Close Button */}
      <div className="absolute top-2 right-2">
        <button
          className="text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex flex-col items-center justify-center h-full space-y-4">
        {MENU.map((item) => (
          <li key={item.id} onClick={toggleMobileMenu}>
            <Link href={item.link} className="text-white text-2xl">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
