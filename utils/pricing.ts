export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
): number | null => {
  if (discountPercentage <= 0) return null;
  return parseFloat((price - price * (discountPercentage / 100)).toFixed(2));
};
