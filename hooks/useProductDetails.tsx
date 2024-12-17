import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/Product";

const useProductDetails = (product: Product) => {
  const { addToCart, cart, updateCart } = useCartStore((state) => state); // Added updateCart
  const [sizes, setSizes] = useState<string[]>([]); // Estado local para tallas seleccionadas

  const handleAddToCart = () => {
    console.log(sizes);

    const newSizes = sizes.join(",");

    const findProductById = cart.find((item) => item.id === product.id);

    if (findProductById) {
      // Actualizar el producto si ya existe en el carrito
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              details: { ...item.details, sizes: newSizes }, // Actualizamos los tamaños
              quantity: item.quantity + 1, // Puedes ajustar la lógica de cantidad si es necesario
            }
          : item
      );

      updateCart(updatedCart);
    } else {
      // Agregar el producto si no existe
      addToCart({
        ...product,
        details: { ...product.details, sizes: newSizes },
        quantity: 1,
      });
    }
  };

  const handleSelectSize = (selectedSize: string) => {
    setSizes((prevSizes) => {
      const updatedSizes = prevSizes.includes(selectedSize)
        ? prevSizes.filter((size) => size !== selectedSize)
        : [...prevSizes, selectedSize];
      return updatedSizes;
    });
  };

  const isSizeSelected = (selectedSize: string) => sizes.includes(selectedSize);

  useEffect(() => {
    // Inicializar con una talla predeterminada
    if (product.details.sizes && !sizes.length) {
      const defaultSize = product.details.sizes.split(",")[0];
      setSizes([defaultSize]);
    }
  }, [product.details.sizes, sizes.length]);

  return {
    handleAddToCart,
    handleSelectSize,
    isSizeSelected,
  };
};

export default useProductDetails;
