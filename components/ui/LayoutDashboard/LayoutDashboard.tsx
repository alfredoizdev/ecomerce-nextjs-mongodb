"use client";

import { useEffect, useState } from "react";
import SidebarDashboard from "./SidebarDashboard";
import HeaderDashboard from "./HeaderDashboard";

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Detectar tamaño de pantalla móvil y cerrar el sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setIsSidebarOpen(false); // Colapsar sidebar en móvil
      } else {
        setIsSidebarOpen(true); // Expandir sidebar en pantallas grandes
      }
    };

    // Ejecutar la función al cargar la página
    handleResize();

    // Escuchar cambios en el tamaño de la pantalla
    window.addEventListener("resize", handleResize);

    // Cleanup al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <SidebarDashboard
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } md:ml-0`}
      >
        {/* Header */}
        <HeaderDashboard />
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default LayoutDashboard;
