import Link from "next/link";

const HeaderDashboard = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <Link href="/profile">
          <span className="text-gray-800 hover:text-gray-500">Profile</span>
        </Link>
        <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
          Logout
        </button>
      </div>
    </header>
  );
};

export default HeaderDashboard;
