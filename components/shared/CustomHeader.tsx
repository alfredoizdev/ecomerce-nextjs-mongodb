import { MENU } from "@/constants/menu";
import Link from "next/link";
import MobileButtonMenu from "./MobileButtonMenu";
import CartMenu from "./CartMenu";
import { signOutAction } from "@/actions/auth";
import { Session } from "@/types/Session";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserLarge } from "react-icons/fa6";

type Props = {
  title: string;
  session?: Session;
};

const CustomHeader = ({ title, session }: Props) => {
  const isLogin = session?.userId ? true : false;

  return (
    <header className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between">
        {/* Title and Subtext */}
        <div>
          <h1 className="text-2xl font-bold uppercase">{title}</h1>
        </div>

        {/* Menu */}
        <nav className="space-x-8 text-sm hidden md:flex">
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
          {isLogin && session?.role === "admin" && (
            <Link href="/admin/dashboard">
              <TbLayoutDashboardFilled size={24} />
            </Link>
          )}
          {isLogin && session?.role === "user" && (
            <Link href="/member/profile">
              <FaUserLarge size={22} />
            </Link>
          )}
          <CartMenu />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          {isLogin && session?.role === "admin" && (
            <Link href="/admin/dashboard">
              <TbLayoutDashboardFilled size={24} />
            </Link>
          )}
          {isLogin && session?.role === "user" && (
            <Link href="/member/profile">
              <FaUserLarge size={20} />
            </Link>
          )}
          <CartMenu />
          <MobileButtonMenu />
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
