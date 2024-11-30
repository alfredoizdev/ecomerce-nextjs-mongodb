import { Product } from "@/types/Product";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Red Running Shoes",
    description: "Perfect for running and everyday use.",
    price: 79.99,
    image: "/images/shoes/product/r1.webp",
    alt: "Red Running Shoes",
    details: {
      material: "Breathable mesh",
      sole: "Rubber sole with high traction",
      weight: "Lightweight design, 200g per shoe",
      colors: ["Red", "Black"],
      sizes: ["7", "8", "9", "10", "11"],
    },
  },
  {
    id: 2,
    name: "Blue Sports Shoes",
    description: "Lightweight and stylish sportswear.",
    price: 89.99,
    image: "/images/shoes/product/b1.webp",
    alt: "Blue Sports Shoes",
    details: {
      material: "Synthetic upper with cushioning",
      sole: "Shock-absorbing midsole",
      weight: "Medium weight, 250g per shoe",
      colors: ["Blue", "White"],
      sizes: ["6", "7", "8", "9", "10"],
    },
  },
  {
    id: 3,
    name: "Black Casual Shoes",
    description: "Comfortable and perfect for outings.",
    price: 69.99,
    image: "/images/shoes/product/bs1.webp",
    alt: "Black Casual Shoes",
    details: {
      material: "Premium leather",
      sole: "Soft padded insole for comfort",
      weight: "Lightweight, 220g per shoe",
      colors: ["Black", "Brown"],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
  },
  {
    id: 4,
    name: "Green Hiking Boots",
    description: "Durable and perfect for all terrains.",
    price: 99.99,
    image: "/images/shoes/product/g1.webp",
    alt: "Green Hiking Boots",
    details: {
      material: "Waterproof fabric with reinforced stitching",
      sole: "Anti-slip rugged outsole",
      weight: "Heavy-duty, 400g per shoe",
      colors: ["Green", "Gray"],
      sizes: ["8", "9", "10", "11", "12"],
    },
  },
];
