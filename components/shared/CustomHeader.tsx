import { MENU } from "@/constants/menu";
import Link from "next/link";
import MobileButtonMenu from "./MobileButtonMenu";
import CartMenu from "./CartMenu";

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
        </div>

        {/* Menu */}
        <nav className="space-x-8 text-sm hidden md:flex">
          {MENU.map((item) => (
            <Link href={item.link} key={item.id}>
              {item.name}
            </Link>
          ))}
          <CartMenu />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <CartMenu />
          <MobileButtonMenu />
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
