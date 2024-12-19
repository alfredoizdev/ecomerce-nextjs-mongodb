import Link from "next/link";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { MdPermMedia, MdOutlineCampaign } from "react-icons/md";

import { LuStore } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiUsersBold } from "react-icons/pi";
import { BiCategoryAlt } from "react-icons/bi";

type Props = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarDashboard = ({ isSidebarOpen, toggleSidebar }: Props) => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside
        className={`bg-gray-800 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        } fixed md:relative h-full z-10`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          {isSidebarOpen && <h1 className="text-2xl font-bold">Dashboard</h1>}
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <FiMenu size={24} />
          </button>
        </div>
        <nav className="mt-4 space-y-2">
          <Link
            href="/"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <LuStore size={24} className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4">Visit Store</span>}
          </Link>
          <Link
            href="/admin/dashboard"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <FiHome className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4">Overview</span>}
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <FiBox className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4">Products</span>}
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <FiShoppingCart className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4">Orders</span>}
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <PiUsersBold className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4">Users</span>}
          </Link>
          <Link
            href="/admin/custom"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <MdOutlineDashboardCustomize className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4">Custom Theme</span>}
          </Link>
          {/* <Link
            href="/admin/genders"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <PiGenderMaleBold className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4">Handle Gender</span>}
          </Link> */}
          <Link
            href="/admin/category"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <BiCategoryAlt className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4">Handle Category</span>}
          </Link>
          <Link
            href="/admin/campaign"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <MdOutlineCampaign className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4">Campaigns</span>}
          </Link>
          <Link
            href="/admin/media"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <MdPermMedia className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4">Media</span>}
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <FiSettings className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-4">Settings</span>}
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default SidebarDashboard;
