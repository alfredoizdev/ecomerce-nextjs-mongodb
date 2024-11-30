export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  details: {
    material: string;
    sole: string;
    weight: string;
    colors: string[];
    sizes: string[];
  };
};
