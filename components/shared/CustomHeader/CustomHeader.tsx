import { MENU } from "@/constants/menu";
import Link from "next/link";

type Props = {
  title: string;
  subtext?: string;
};

const CustomHeader = ({ title, subtext = "" }: Props) => {
  return (
    <header className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between">
        {/* Title and Subtext */}
        <div>
          <h1 className="text-2xl font-bold uppercase">{title}</h1>
          {subtext && <p className="text-sm text-gray-400">{subtext}</p>}
        </div>

        {/* Menu */}
        <nav className="space-x-8 text-sm hidden md:flex">
          {MENU.map((item) => (
            <Link href={item.link} key={item.id}>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            {/* Mobile Menu Icon */}
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

export default CustomHeader;
