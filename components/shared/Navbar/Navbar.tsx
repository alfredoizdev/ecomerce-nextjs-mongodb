import { MENU } from "@/constants/menu";
import Link from "next/link";

const Navbar = () => {
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
        </nav>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
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
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
