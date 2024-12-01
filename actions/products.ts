"use server";

import { PRODUCTS } from "@/lib/data";
import connectToMongoDB from "@/lib/database";
import Product from "@/models/Product";
import { Product as TProduct } from "@/types/Product";

export const getProductsAction = async (
  gender?: string
): Promise<TProduct[]> => {
  await connectToMongoDB();

  const newFilter = gender && gender !== "All" ? { gender } : {};

  try {
    const products = await Product.find<TProduct>(newFilter).exec();
    const results = JSON.parse(JSON.stringify(products));
    return results;
  } catch (error) {
    if (error instanceof Error) {
      return [];
    }
    return [];
  }
};

export const createProductAction = async (
  product: TProduct
): Promise<TProduct> => {
  await connectToMongoDB();

  const newProduct = new Product(product, {
    new: true,
  });
  await newProduct.save();

  return newProduct as TProduct;
};

export const seedDataProducts = async () => {
  await connectToMongoDB();

  await Product.insertMany(PRODUCTS);
};
