"use client";
import Link from "next/link";
import useMobileMenu from "@/hooks/useMobileMenu";
import { signOutAction } from "@/actions/auth";
import { Session } from "@/types/Session";
import Menu from "./Menu";

type Props = {
  session?: Session;
  theme?: {
    navbarTextColor?: string;
  };
};

const MobileMenu = ({ session }: Props) => {
  const { isMobileMenuOpen, toggleMobileMenu, isVisible } = useMobileMenu();
  const isLogin = session?.userId ? true : false;

  if (!isMobileMenuOpen && !isVisible) return null;

  return (
    <div
      className={`fixed w-full h-full bg-black z-20 top-0 p-5 md:hidden transition-opacity duration-300 ${
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
      <ul className="flex flex-col items-center justify-center h-full space-y-4 uppercase">
        <Menu color={"#fff"} fontSizes="lg" />
        {isLogin ? (
          <li onClick={toggleMobileMenu}>
            <button
              className="m-0 p-0 text-white text-2xl"
              onClick={signOutAction}
            >
              Logout
            </button>
          </li>
        ) : (
          <li onClick={toggleMobileMenu}>
            <Link href="/auth/signin" className="text-white text-2xl">
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
