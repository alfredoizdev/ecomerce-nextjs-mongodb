import { useEffect, useState } from "react";
import useUiStore from "@/store/useUiStore";

const useMobileMenu = () => {
  const { isMobileMenuOpen, toggleMobileMenu } = useUiStore((state) => state);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsVisible(true); // Mostrar el menú inmediatamente al abrir
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Ocultar después de la animación
      return () => clearTimeout(timer);
    }
  }, [isMobileMenuOpen]);

  return { isMobileMenuOpen, toggleMobileMenu, isVisible };
};

export default useMobileMenu;
