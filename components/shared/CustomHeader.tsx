import { MENU } from "@/constants/menu";
import Link from "next/link";
import MobileButtonMenu from "./MobileButtonMenu";
import CartMenu from "./CartMenu";
import { signOutAction } from "@/actions/auth";
import { Session } from "@/types/Session";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserLarge } from "react-icons/fa6";
import { THEME_DEFAULT } from "@/constants/theme";

type Props = {
  title: string;
  session?: Session;
  theme?: {
    backgroundBtn: string;
    textBtn: string;
    navbarColor: string;
    navbarTextColor: string;
  };
};

const CustomHeader = ({ title, session, theme }: Props) => {
  const isLogin = session?.userId ? true : false;

  return (
    <header
      className="py-6"
      style={{
        backgroundColor: theme?.navbarColor || THEME_DEFAULT.navbarColor,
        color: theme?.navbarTextColor || THEME_DEFAULT.navbarTextColor,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between">
        {/* Title and Subtext */}
        <div>
          <h1 className="text-2xl font-bold uppercase">{title}</h1>
        </div>

        {/* Menu */}
        <nav className="space-x-8 text-sm hidden md:flex uppercase">
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
            <Link className="text-lg" href="/auth/signin">
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
              <FaUserLarge size={22} />
            </Link>
          )}
          <CartMenu {...theme} />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          {isLogin && session?.role === "admin" && (
            <Link className="text-lg" href="/admin/dashboard">
              <TbLayoutDashboardFilled size={24} />
            </Link>
          )}
          {isLogin && session?.role === "user" && (
            <Link className="text-lg" href="/member/profile">
              <FaUserLarge size={20} />
            </Link>
          )}
          <CartMenu {...theme} />
          <MobileButtonMenu navbarTextColor={theme?.navbarTextColor} />
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
