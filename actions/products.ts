"use server";
import { revalidatePath } from "next/cache";

import { PRODUCTS } from "@/lib/data";
import connectToMongoDB from "@/lib/database";
import { FormStateProduct, ProductFormSchema } from "@/lib/definitions";
import Product from "@/models/Product";
import { Product as TProduct } from "@/types/Product";
import cloudinary from "@/lib/cloudinary";
import { extractIdFromUrl } from "@/utils/image";

export const getProductsAction = async (
  gender?: string
): Promise<TProduct[]> => {
  await connectToMongoDB();

  const newFilter = gender && gender !== "all" ? { gender } : {};

  try {
    const products = await Product.find<TProduct>(newFilter)
      .sort({ createdAt: -1 }) // Orden descendente por fecha de creación
      .exec();
    const results = JSON.parse(JSON.stringify(products));
    return results;
  } catch (error) {
    if (error instanceof Error) {
      return [];
    }
    return [];
  }
};

export const deleteProductAction = async (
  id: string,
  image: string
): Promise<void> => {
  if (!id) {
    return;
  }

  const imageId = extractIdFromUrl(image);

  if (!imageId) {
    return;
  }

  await cloudinary.api.delete_resources([imageId], {
    type: "upload",
    resource_type: "image",
  });

  await connectToMongoDB();

  await Product.findByIdAndDelete(id).exec();

  revalidatePath("/admin/products");
};

export const createProductAction = async (
  state: FormStateProduct,
  formData: FormData
): Promise<FormStateProduct> => {
  const validatedFields = ProductFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    category: formData.get("category"),
    discountPercentage: Number(formData.get("discountPercentage")),
    material: formData.get("material"),
    sole: formData.get("sole"),
    colors: formData.get("colors"),
    sizes: formData.get("sizes"),
    gender: formData.get("gender"),
    weight: formData.get("weight"),
    image: formData.get("image"),
  });

  console.log("IMAGE", formData.get("image"));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        category: formData.get("category") as string,
        discountPercentage: Number(formData.get("discountPercentage")),
        material: formData.get("material") as string,
        sole: formData.get("sole") as string,
        colors: formData.get("colors") as string,
        sizes: formData.get("sizes") as string,
        weight: formData.get("weight") as string,
        gender: formData.get("gender") as string,
      },
    };
  }

  const {
    name,
    description,
    category,
    price,
    discountPercentage,
    sole,
    material,
    colors,
    weight,
    sizes,
    gender,
  } = validatedFields.data;

  const setColor = colors.split(",").map((color: string) => color.trim());
  const setSizes = sizes.split(",").map((size: string) => size.trim());

  await connectToMongoDB();

  const newProduct = Product.build({
    name,
    description,
    category,
    price,
    alt: name,
    image:
      (formData.get("image") as string) ||
      "/images/shoes/product/not-image.webp",
    discountPercentage,
    gender,
    details: {
      material,
      sole,
      weight,
      colors: setColor,
      sizes: setSizes,
    },
  });

  await newProduct.save();

  return {
    success: true,
    message: "Product created successfully.",
  };
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
