"use client";
import { MENU } from "@/constants/menu";
import Link from "next/link";
import MobileButtonMenu from "./MobileButtonMenu";
import CartMenu from "./CartMenu";
import { signOutAction } from "@/actions/auth";

type Props = {
  isLogin?: boolean;
};

const Navbar = ({ isLogin }: Props) => {
  return (
    <header className="absolute top-0 w-full bg-black bg-opacity-80 text-white z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16">
        {/* Brand */}
        <div className="text-2xl font-bold uppercase">
          <Link href="/">StyleFoot</Link>
        </div>
        {/* Menu */}
        <nav className="hidden md:flex space-x-8">
          {MENU.map((item) => (
            <Link href={item.link} key={item.id}>
              {item.name}
            </Link>
          ))}
          {isLogin ? (
            <button className="m-0 p-0" onClick={signOutAction}>
              Logout
            </button>
          ) : (
            <Link href="/auth/signin">Login</Link>
          )}
          <CartMenu />
        </nav>
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          <CartMenu />
          <MobileButtonMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
