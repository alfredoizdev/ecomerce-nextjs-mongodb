import Link from "next/link";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiSettings,
  FiMenu,
} from "react-icons/fi";

type Props = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarDashboard = ({ isSidebarOpen, toggleSidebar }: Props) => {
  return (
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
          href="/dashboard/orders"
          className="flex items-center px-4 py-2 hover:bg-gray-700"
        >
          <FiShoppingCart className="w-5 h-5" />
          {isSidebarOpen && <span className="ml-4">Orders</span>}
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center px-4 py-2 hover:bg-gray-700"
        >
          <FiSettings className="w-5 h-5" />
          {isSidebarOpen && <span className="ml-4">Settings</span>}
        </Link>
      </nav>
    </aside>
  );
};

export default SidebarDashboard;
