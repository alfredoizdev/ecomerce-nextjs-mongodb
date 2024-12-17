"use client";
import { MENU } from "@/constants/menu";
import Link from "next/link";
import MobileButtonMenu from "./MobileButtonMenu";
import CartMenu from "./CartMenu";
import { signOutAction } from "@/actions/auth";
import { Session } from "@/types/Session";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserLarge } from "react-icons/fa6";

type Props = {
  session?: Session;
  theme?: {
    backgroundBtn: string;
    textBtn: string;
    navbarColor: string;
    navbarTextColor: string;
  };
};

const Navbar = ({ session, theme }: Props) => {
  const isLogin = session?.userId ? true : false;

  return (
    <header
      className="absolute top-0 w-full bg-opacity-80 z-10"
      style={{
        backgroundColor: theme?.navbarColor || "black",
        color: theme?.navbarTextColor || "white",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16 uppercase">
        {/* Brand */}
        <div className="text-2xl font-bold uppercase">
          <Link href="/">StyleFoot</Link>
        </div>
        {/* Menu */}
        <nav className="hidden md:flex space-x-8">
          {MENU.map((item) => (
            <Link className="text-lg" href={item.link} key={item.id}>
              {item.name}
            </Link>
          ))}
          {isLogin ? (
            <button
              className="m-0 p-0 text-lg uppercase text-red-500"
              onClick={signOutAction}
            >
              Logout
            </button>
          ) : (
            <Link className="text-lg uppercase" href="/auth/signin">
              Login
            </Link>
          )}
          {isLogin && session?.role === "admin" && (
            <Link className="text-lg" href="/admin/dashboard">
              <TbLayoutDashboardFilled size={24} />
            </Link>
          )}
          {isLogin && session?.role === "user" && (
            <Link className="text-lg" href="/member/profile">
              <FaUserLarge size={23} />
            </Link>
          )}
          <CartMenu {...theme} />
        </nav>
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          {isLogin && session?.role === "admin" && (
            <Link className="text-lg" href="/admin/dashboard">
              <TbLayoutDashboardFilled size={24} />
            </Link>
          )}
          {isLogin && session?.role === "user" && (
            <Link className="text-lg" href="/member/profile">
              <FaUserLarge size={23} />
            </Link>
          )}
          <CartMenu {...theme} />
          <MobileButtonMenu navbarTextColor={theme?.navbarTextColor} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
