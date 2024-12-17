import { useState, useEffect, useRef } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/Product";

const useHandleSizes = (product: Product) => {
  const { updateCart } = useCartStore((state) => state);
  const [sizes, setSizes] = useState<string[]>([]); // Estado interno
  const initialized = useRef(false);

  // Manejar la selección de tallas
  const handleSelectSize = (selectedSize: string) => {
    setSizes((prevSizes) => {
      return prevSizes.includes(selectedSize)
        ? prevSizes.filter((size) => size !== selectedSize) // Desactivar tamaño
        : [...prevSizes, selectedSize]; // Activar tamaño
    });
  };

  // Sincronizar carrito cuando `sizes` cambie
  useEffect(() => {
    if (sizes.length > 0) {
      const { cart } = useCartStore.getState(); // Obtener el estado actual del carrito sin suscribirse
      const productCart = cart.find((item) => item.id === product.id);

      updateCart([
        ...cart.filter((item) => item.id !== product.id),
        {
          ...product,
          details: { ...product.details, sizes: sizes.join(",") },
          quantity: productCart ? productCart.quantity : 1,
        },
      ]);
    }
  }, [sizes, updateCart, product]);

  // Inicializar con una talla predeterminada
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const defaultSize = product.details.sizes.split(",")[0];
      setSizes([defaultSize]);
    }
  }, [product.details.sizes]);

  const isSizeSelected = (selectedSize: string) => sizes.includes(selectedSize);

  return { handleSelectSize, isSizeSelected, sizes };
};

export default useHandleSizes;
