import { TCamp } from "@/types/Camp";
import { DTOCategory } from "@/types/Category";
import { Product } from "@/types/Product";

export const CATEGORIES: DTOCategory[] = [
  {
    category: "Man",
  },
  {
    category: "Women",
  },
  {
    category: "Unisex",
  },
  {
    category: "Kid",
  },
];

export const PRODUCTS: Product[] = [
  {
    name: "Red Running Shoes",
    description: "Perfect for running and everyday use.",
    price: 79.99,
    image: "/images/shoes/product/r1.webp",
    alt: "Red Running Shoes",
    category: "man", // Cambiado a "man"
    discountPercentage: 10, // 10% de descuento
    inStock: "in",
    details: {
      material: "Breathable mesh",
      sole: "Rubber sole with high traction",
      weight: "Lightweight design, 200g per shoe",
      colors: "Red, Black",
      sizes: "7, 8, 9, 10, 11",
    },
  },
  {
    name: "Blue Sports Shoes",
    description: "Lightweight and stylish sportswear.",
    price: 89.99,
    image: "/images/shoes/product/b1.webp",
    alt: "Blue Sports Shoes",
    category: "women", // Cambiado a "women"
    discountPercentage: 0, // Sin descuento
    inStock: "in",
    details: {
      material: "Synthetic upper with cushioning",
      sole: "Shock-absorbing midsole",
      weight: "Medium weight, 250g per shoe",
      colors: "Blue, White",
      sizes: "6, 7, 8, 9, 10",
    },
  },
  {
    name: "Black Casual Shoes",
    description: "Comfortable and perfect for outings.",
    price: 69.99,
    image: "/images/shoes/product/bs1.webp",
    alt: "Black Casual Shoes",
    category: "unisex", // Cambiado a "unisex"
    discountPercentage: 15, // 15% de descuento
    inStock: "in",
    details: {
      material: "Premium leather",
      sole: "Soft padded insole for comfort",
      weight: "Lightweight, 220g per shoe",
      colors: "Black, Brown",
      sizes: "6, 7, 8, 9, 10, 11",
    },
  },
  {
    name: "Green Hiking Boots",
    description: "Durable and perfect for all terrains.",
    price: 99.99,
    image: "/images/shoes/product/g1.webp",
    alt: "Green Hiking Boots",
    category: "kid", // Cambiado a "kid"
    discountPercentage: 0, // Sin descuento
    inStock: "out",
    details: {
      material: "Waterproof fabric with reinforced stitching",
      sole: "Anti-slip rugged outsole",
      weight: "Heavy-duty, 400g per shoe",
      colors: "Green, Gray",
      sizes: "8, 9, 10, 11, 12",
    },
  },
  {
    name: "White Sneakers",
    description: "Minimalist sneakers perfect for casual wear and comfort.",
    price: 89.99,
    image: "/images/shoes/product/white-sneakers.webp",
    alt: "White Sneakers",
    category: "unisex", // Cambiado a "unisex"
    discountPercentage: 20, // 20% de descuento
    inStock: "in",
    details: {
      material: "Breathable canvas",
      sole: "Cushioned foam sole",
      weight: "300g per shoe",
      colors: "White, Grey",
      sizes: "6, 7, 8, 9, 10, 11",
    },
  },
  {
    name: "Yellow Running Shoes",
    description:
      "Vibrant and lightweight running shoes for optimal performance.",
    price: 84.99,
    image: "/images/shoes/product/yellow-running-shoes.webp",
    alt: "Yellow Running Shoes",
    category: "man", // Cambiado a "man"
    discountPercentage: 0, // Sin descuento
    inStock: "out",
    details: {
      material: "Knitted fabric with breathable technology",
      sole: "Durable EVA foam sole",
      weight: "Ultra-lightweight, 210g per shoe",
      colors: "Yellow, Black",
      sizes: "6, 7, 8, 9, 10",
    },
  },
  {
    name: "Brown Leather Boots",
    description: "Elegant leather boots ideal for casual and formal wear.",
    price: 129.99,
    image: "/images/shoes/product/brown-leather-boots.webp",
    alt: "Brown Leather Boots",
    category: "women", // Cambiado a "women"
    discountPercentage: 0, // Sin descuento
    inStock: "in",
    details: {
      material: "Premium genuine leather",
      sole: "Non-slip rubber sole",
      weight: "Medium weight, 500g per shoe",
      colors: "Brown, Tan",
      sizes: "8, 9, 10, 11, 12",
    },
  },
  {
    name: "Pink Sports Shoes",
    description: "Stylish sports shoes with excellent cushioning and support.",
    price: 74.99,
    image: "/images/shoes/product/pink-sports-shoes.webp",
    alt: "Pink Sports Shoes",
    category: "kid", // Cambiado a "kid"
    discountPercentage: 0, // Sin descuento
    inStock: "out",
    details: {
      material: "Synthetic upper with breathable mesh",
      sole: "Cushioned sole for impact absorption",
      weight: "Lightweight, 220g per shoe",
      colors: "Pink, White",
      sizes: "6, 7, 8, 9",
    },
  },
  {
    name: "Orange Trail Running Shoes",
    description: "Perfect for off-road adventures and trails.",
    price: 94.99,
    image: "/images/shoes/product/orange-trail-shoes.webp",
    alt: "Orange Trail Running Shoes",
    category: "unisex", // Cambiado a "unisex"
    discountPercentage: 10, // 10% de descuento
    inStock: "in",
    details: {
      material: "Durable mesh with water-resistant coating",
      sole: "High-traction rubber outsole",
      weight: "Medium weight, 270g per shoe",
      colors: "Orange, Black",
      sizes: "6, 7, 8, 9, 10, 11",
    },
  },
  {
    name: "Purple Fashion Sneakers",
    description: "Bold and trendy sneakers for urban looks.",
    price: 89.99,
    image: "/images/shoes/product/purple-fashion-sneakers.webp",
    alt: "Purple Fashion Sneakers",
    category: "man", // Cambiado a "man"
    discountPercentage: 5, // 5% de descuento
    inStock: "out",
    details: {
      material: "Synthetic leather with padded collar",
      sole: "Lightweight EVA sole",
      weight: "Lightweight, 220g per shoe",
      colors: "Purple, White",
      sizes: "5, 6, 7, 8, 9",
    },
  },
  {
    name: "Gray Athletic Shoes",
    description: "Engineered for superior performance and comfort.",
    price: 119.99,
    image: "/images/shoes/product/gray-athletic-shoes.webp",
    alt: "Gray Athletic Shoes",
    category: "women", // Cambiado a "women"
    discountPercentage: 15, // 15% de descuento
    inStock: "in",
    details: {
      material: "Engineered mesh for breathability",
      sole: "Responsive foam midsole",
      weight: "Ultra-lightweight, 190g per shoe",
      colors: "Gray, Blue",
      sizes: "7, 8, 9, 10, 11, 12",
    },
  },
  {
    name: "Silver High-Top Sneakers",
    description: "High-top sneakers designed for both comfort and style.",
    price: 149.99,
    image: "/images/shoes/product/silver-high-top-sneakers.webp",
    alt: "Silver High-Top Sneakers",
    category: "kid", // Cambiado a "kid"
    discountPercentage: 20, // 20% de descuento
    inStock: "out",
    details: {
      material: "Premium synthetic with metallic finish",
      sole: "Non-slip rubber outsole",
      weight: "Medium weight, 320g per shoe",
      colors: "Silver, Black",
      sizes: "6, 7, 8, 9, 10, 11, 12",
    },
  },
];

export const CAMPAIGN: TCamp[] = [
  {
    title: "Summer Sale",
    description: "Get up to 50% off on all products",
    image: "/images/shoes/product/glass.webp",
    page: "/products",
    startDate: "2022-06-01",
    endDate: "2022-06-30",
    color: "#3291ff",
  },
  {
    title: "Winter Collection",
    description: "New arrivals for the season",
    image: "/images/shoes/product/camp.webp",
    page: "/products",
    startDate: "2022-12-01",
    endDate: "2022-12-31",
    color: "#5cac1e",
  },
  {
    title: "Back to School",
    description: "Get ready for the new school year",
    image: "/images/shoes/product/jacket.webp",
    page: "/products",
    startDate: "2022-08-01",
    endDate: "2022-08-31",
    color: "#7928ca",
  },
  {
    title: "Spring Collection",
    description: "Fresh styles for the season",
    image: "/images/shoes/product/jordan.webp",
    page: "/products",
    startDate: "2022-03-01",
    endDate: "2022-03-31",
    color: "#a0456a",
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
  footer: {
    footerColorTitle: "#fff",
    backgroundColor: "#111827",
    color: "#fff",
  },
  navbar: {
    navbarColor: "#0b0a07",
    navbarTextColor: "#fff",
  },
};
