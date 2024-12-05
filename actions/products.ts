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
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!id) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    const imageId = extractIdFromUrl(image);

    if (imageId) {
      await cloudinary.api.delete_resources([imageId], {
        type: "upload",
        resource_type: "image",
      });
    }

    await connectToMongoDB();

    await Product.findByIdAndDelete(id).exec();
    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "An error occurred while deleting the product.",
    };
  }
};

export const updateProductAction = async (
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
    inStock: formData.get("inStock"),
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
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
    inStock,
    id,
  } = validatedFields.data;

  const setColor = colors.split(",").map((color: string) => color.trim());
  const setSizes = sizes.split(",").map((size: string) => size.trim());

  await connectToMongoDB();

  const product = await Product.findById(id).exec();

  if (!product) {
    return {
      success: false,
      message: "Product not found.",
    };
  }

  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  product.discountPercentage = discountPercentage;
  product.details.material = material;
  product.details.sole = sole;
  product.details.colors = setColor;
  product.details.sizes = setSizes;
  product.gender = gender;
  product.details.weight = weight;
  product.image = (formData.get("image") as string) || product.image;
  product.inStock = inStock || product.inStock;

  await product.save();
  revalidatePath(`/admin/products/edit/${id}`, "page");

  return {
    success: true,
    message: "Product updated successfully.",
  };
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
    inStock: formData.get("inStock"),
  });

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
        inStock: formData.get("inStock") as string,
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
    inStock,
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
    inStock: inStock || "in",
    details: {
      material,
      sole,
      weight,
      colors: setColor,
      sizes: setSizes,
    },
  });

  await newProduct.save();
  revalidatePath("/admin/products");

  return {
    success: true,
    message: "Product created successfully.",
  };
};

export const findProductByIdAction = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
  data: TProduct | null;
}> => {
  await connectToMongoDB();

  const product = await Product.findById(id).exec();

  if (!product) {
    return {
      success: false,
      message: "Product not found.",
      data: null,
    };
  }

  // Update product logic here (e.g., product.name = "New Name"; await product.save();)

  return {
    success: true,
    message: "Product updated successfully.",
    data: JSON.parse(JSON.stringify(product)),
  };
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
