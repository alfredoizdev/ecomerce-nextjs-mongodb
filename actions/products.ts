"use server";

import { PRODUCTS } from "@/lib/data";
import connectToMongoDB from "@/lib/database";
import Product from "@/models/Product";
import { Product as TProduct } from "@/types/Product";

export const getProductsAction = async (
  gender?: string
): Promise<TProduct[]> => {
  await connectToMongoDB();

  const newFilter = gender && gender !== "all" ? { gender } : {};

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

export const getProductByIdAction = async (id: string): Promise<TProduct> => {
  await connectToMongoDB();

  try {
    const product = await Product.findById(id).exec();
    const results = JSON.parse(JSON.stringify(product));
    return results as TProduct;
  } catch (error) {
    if (error instanceof Error) {
      return {} as TProduct;
    }
    return {} as TProduct;
  }
};

export const getAllProductsExceptCurrentAction = async (
  id: string
): Promise<TProduct[]> => {
  await connectToMongoDB();

  try {
    const products = (await Product.find({ _id: { $ne: id } }).exec()).slice(
      0,
      4
    );
    const results = JSON.parse(JSON.stringify(products));
    return results as TProduct[];
  } catch (error) {
    if (error instanceof Error) {
      return [];
    }
    return [];
  }
};

export const seedDataProducts = async () => {
  await connectToMongoDB();

  await Product.insertMany(PRODUCTS);
};
