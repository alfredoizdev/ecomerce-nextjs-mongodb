import { useCartStore } from "@/store/useCartStore";
import { useCallback, useMemo } from "react";

const useCarCalculations = () => {
  const { cart, udateQuantity, removeFromCart } = useCartStore(
    (state) => state
  );

  // Calcula el precio con descuento
  const calculateDiscountedPrice = useCallback(
    (price: number, discountPercentage: number) => {
      return discountPercentage > 0
        ? price - (price * discountPercentage) / 100
        : price;
    },
    []
  );

  // Maneja el cambio de cantidad
  const handleQuantityChange = useCallback(
    (id: string, delta: number) => {
      udateQuantity(id, delta);
    },
    [udateQuantity]
  );

  // Calcula el total con los descuentos aplicados
  const calculateTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const discountedPrice = calculateDiscountedPrice(
        item.price,
        item.discountPercentage || 0
      );
      return total + discountedPrice * item.quantity;
    }, 0);
  }, [cart, calculateDiscountedPrice]);

  // Calcula los ahorros totales
  const calculateTotalSavings = useMemo(() => {
    return cart.reduce((totalSavings, item) => {
      if (item.discountPercentage > 0) {
        const savingsPerItem =
          ((item.price * item.discountPercentage) / 100) * item.quantity;
        return totalSavings + savingsPerItem;
      }
      return totalSavings;
    }, 0);
  }, [cart]);

  return {
    cart,
    calculateDiscountedPrice,
    handleQuantityChange,
    calculateTotal,
    calculateTotalSavings,
    removeFromCart,
  };
};

export default useCarCalculations;
