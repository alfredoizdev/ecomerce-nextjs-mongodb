import { Product } from "@/types/Product";

export const PRODUCTS: Product[] = [
  {
    name: "Red Running Shoes",
    description: "Perfect for running and everyday use.",
    price: 79.99,
    image: "/images/shoes/product/r1.webp",
    alt: "Red Running Shoes",
    category: "Running",
    gender: "unisex",
    discountPercentage: 10, // 10% de descuento
    inStock: "in",
    details: {
      material: "Breathable mesh",
      sole: "Rubber sole with high traction",
      weight: "Lightweight design, 200g per shoe",
      colors: ["Red", "Black"],
      sizes: ["7", "8", "9", "10", "11"],
    },
  },
  {
    name: "Blue Sports Shoes",
    description: "Lightweight and stylish sportswear.",
    price: 89.99,
    image: "/images/shoes/product/b1.webp",
    alt: "Blue Sports Shoes",
    category: "Sportswear",
    gender: "man",
    discountPercentage: 0, // Sin descuento
    inStock: "in",
    details: {
      material: "Synthetic upper with cushioning",
      sole: "Shock-absorbing midsole",
      weight: "Medium weight, 250g per shoe",
      colors: ["Blue", "White"],
      sizes: ["6", "7", "8", "9", "10"],
    },
  },
  {
    name: "Black Casual Shoes",
    description: "Comfortable and perfect for outings.",
    price: 69.99,
    image: "/images/shoes/product/bs1.webp",
    alt: "Black Casual Shoes",
    category: "Casual",
    gender: "unisex",
    discountPercentage: 15, // 15% de descuento
    inStock: "in",
    details: {
      material: "Premium leather",
      sole: "Soft padded insole for comfort",
      weight: "Lightweight, 220g per shoe",
      colors: ["Black", "Brown"],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
  },
  {
    name: "Green Hiking Boots",
    description: "Durable and perfect for all terrains.",
    price: 99.99,
    image: "/images/shoes/product/g1.webp",
    alt: "Green Hiking Boots",
    category: "Hiking",
    gender: "man",
    discountPercentage: 0, // Sin descuento
    inStock: "out",
    details: {
      material: "Waterproof fabric with reinforced stitching",
      sole: "Anti-slip rugged outsole",
      weight: "Heavy-duty, 400g per shoe",
      colors: ["Green", "Gray"],
      sizes: ["8", "9", "10", "11", "12"],
    },
  },
  {
    name: "White Sneakers",
    description: "Minimalist sneakers perfect for casual wear and comfort.",
    price: 89.99,
    image: "/images/shoes/product/white-sneakers.webp",
    alt: "White Sneakers",
    category: "Casual",
    gender: "unisex",
    discountPercentage: 20, // 20% de descuento
    inStock: "in",
    details: {
      material: "Breathable canvas",
      sole: "Cushioned foam sole",
      weight: "300g per shoe",
      colors: ["White", "Grey"],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
  },
  {
    name: "Yellow Running Shoes",
    description:
      "Vibrant and lightweight running shoes for optimal performance.",
    price: 84.99,
    image: "/images/shoes/product/yellow-running-shoes.webp",
    alt: "Yellow Running Shoes",
    category: "Running",
    gender: "women",
    discountPercentage: 0, // Sin descuento
    inStock: "out",
    details: {
      material: "Knitted fabric with breathable technology",
      sole: "Durable EVA foam sole",
      weight: "Ultra-lightweight, 210g per shoe",
      colors: ["Yellow", "Black"],
      sizes: ["6", "7", "8", "9", "10"],
    },
  },
  {
    name: "Brown Leather Boots",
    description: "Elegant leather boots ideal for casual and formal wear.",
    price: 129.99,
    image: "/images/shoes/product/brown-leather-boots.webp",
    alt: "Brown Leather Boots",
    category: "Boots",
    gender: "man",
    discountPercentage: 0, // Sin descuento
    inStock: "in",
    details: {
      material: "Premium genuine leather",
      sole: "Non-slip rubber sole",
      weight: "Medium weight, 500g per shoe",
      colors: ["Brown", "Tan"],
      sizes: ["8", "9", "10", "11", "12"],
    },
  },
  {
    name: "Pink Sports Shoes",
    description: "Stylish sports shoes with excellent cushioning and support.",
    price: 74.99,
    image: "/images/shoes/product/pink-sports-shoes.webp",
    alt: "Pink Sports Shoes",
    category: "Sportswear",
    gender: "women",
    discountPercentage: 0, // Sin descuento
    inStock: "out",
    details: {
      material: "Synthetic upper with breathable mesh",
      sole: "Cushioned sole for impact absorption",
      weight: "Lightweight, 220g per shoe",
      colors: ["Pink", "White"],
      sizes: ["6", "7", "8", "9"],
    },
  },
  {
    name: "Orange Trail Running Shoes",
    description: "Perfect for off-road adventures and trails.",
    price: 94.99,
    image: "/images/shoes/product/orange-trail-shoes.webp",
    alt: "Orange Trail Running Shoes",
    category: "Running",
    gender: "unisex",
    discountPercentage: 10, // 10% de descuento
    inStock: "in",
    details: {
      material: "Durable mesh with water-resistant coating",
      sole: "High-traction rubber outsole",
      weight: "Medium weight, 270g per shoe",
      colors: ["Orange", "Black"],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
  },
  {
    name: "Purple Fashion Sneakers",
    description: "Bold and trendy sneakers for urban looks.",
    price: 89.99,
    image: "/images/shoes/product/purple-fashion-sneakers.webp",
    alt: "Purple Fashion Sneakers",
    category: "Casual",
    gender: "women",
    discountPercentage: 5, // 5% de descuento
    inStock: "out",
    details: {
      material: "Synthetic leather with padded collar",
      sole: "Lightweight EVA sole",
      weight: "Lightweight, 220g per shoe",
      colors: ["Purple", "White"],
      sizes: ["5", "6", "7", "8", "9"],
    },
  },
  {
    name: "Gray Athletic Shoes",
    description: "Engineered for superior performance and comfort.",
    price: 119.99,
    image: "/images/shoes/product/gray-athletic-shoes.webp",
    alt: "Gray Athletic Shoes",
    category: "Sportswear",
    gender: "man",
    discountPercentage: 15, // 15% de descuento
    inStock: "in",
    details: {
      material: "Engineered mesh for breathability",
      sole: "Responsive foam midsole",
      weight: "Ultra-lightweight, 190g per shoe",
      colors: ["Gray", "Blue"],
      sizes: ["7", "8", "9", "10", "11", "12"],
    },
  },
  {
    name: "Silver High-Top Sneakers",
    description: "High-top sneakers designed for both comfort and style.",
    price: 149.99,
    image: "/images/shoes/product/silver-high-top-sneakers.webp",
    alt: "Silver High-Top Sneakers",
    category: "Casual",
    gender: "unisex",
    discountPercentage: 20, // 20% de descuento
    inStock: "out",
    details: {
      material: "Premium synthetic with metallic finish",
      sole: "Non-slip rubber outsole",
      weight: "Medium weight, 320g per shoe",
      colors: ["Silver", "Black"],
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
    },
  },
];

export const PRODUCT_CATEGORIES = [
  "Running",
  "Sportswear",
  "Casual",
  "Hiking",
  "Boots",
];

export const PRODUCT_COLORS = [
  "Red",
  "Blue",
  "Black",
  "Green",
  "White",
  "Yellow",
  "Brown",
  "Pink",
  "Orange",
  "Purple",
  "Gray",
  "Silver",
];

export const PRODUCT_SIZES = ["5", "6", "7", "8", "9", "10", "11", "12"];

export const DEFAUL_THEME_HOME = {
  colors: {
    background: "#F8F9FA", // Fondo gris claro
    text: "#515050", // Texto negro
    cardColor: "#ffffff",
    button: {
      background: "#171717", // Verde para botones
      text: "#fafafa", // Texto blanco
    },
  },
  hero: {
    title: "Welcome to Our Platform",
    subtitle: "Build your next project with confidence",
    bannerImage: "/images/shoes/red/red-banner.webp", // Imagen placeholder
    heroColorTitle: "#fff",
    heroColorSubtitle: "#fff",
  },
};
