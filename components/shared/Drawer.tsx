"use client";
import { IoMdClose } from "react-icons/io";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: "w-1/4" | "w-1/3" | "w-1/2" | "w-2/3" | "w-3/4" | "w-full";
  height?: "h-1/4" | "h-1/3" | "h-1/2" | "h-2/3" | "h-3/4" | "h-screen";
  position?: "top" | "bottom" | "right";
};

const Drawer = ({
  isOpen,
  onClose,
  children,
  width = "w-1/3",
  height = "h-screen",
  position = "right",
}: DrawerProps) => {
  // Determine position-specific styles
  const positionClasses = {
    top: `top-0 left-0 ${width} ${
      isOpen ? "translate-y-0" : "-translate-y-full"
    }`,
    bottom: `bottom-0 left-0 ${width} ${
      isOpen ? "translate-y-0" : "translate-y-full"
    } ${height}`, // Apply dynamic height for bottom
    right: `right-0 top-0 ${height} ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`,
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}
      aria-hidden={!isOpen}
    >
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Drawer Content */}
      <div
        className={`fixed bg-white shadow-lg overflow-y-auto transition-transform transform ${positionClasses[position]}`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <IoMdClose size={30} />
          </button>
        </div>
        {/* Drawer Children */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
