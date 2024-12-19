export type Product = {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  category: string;
  discountPercentage: number;
  inStock: string;
  publicImageId?: string;
  createdAt?: string;
  updatedAt?: string;
  details: {
    material: string;
    sole: string;
    weight: string;
    colors: string;
    sizes: string;
  };
};
