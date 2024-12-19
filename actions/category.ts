"use server";

import connectToMongoDB from "@/lib/database";
import { FormStateCategory, categoryFormSchema } from "@/lib/definitions";
import Category from "@/models/Category";
import { DTOCategory } from "@/types/Category";
import { revalidatePath } from "next/cache";

export const addCategoryAction = async (
  state: FormStateCategory,
  formData: FormData
): Promise<FormStateCategory> => {
  const validatedFields = categoryFormSchema.safeParse({
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { category } = validatedFields.data;

  try {
    await connectToMongoDB();

    const newGender = Category.build({
      category,
    });
    await newGender.save();

    revalidatePath("/admin/category", "page");

    return {
      success: true,
      message: "successfully added",
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
      message: "An error occurred",
    };
  }
};

export const getCategoryAction = async (): Promise<{
  success: boolean;
  data?: DTOCategory[];
  message?: string;
}> => {
  try {
    await connectToMongoDB();

    const getGenders = await Category.find({});

    return {
      success: true,
      data: JSON.parse(JSON.stringify(getGenders)),
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
      message: "An error occurred",
    };
  }
};

export const deleteCategoryAction = async (id: string) => {
  try {
    await connectToMongoDB();

    await Category.findByIdAndDelete(id).exec();

    revalidatePath("/admin/category", "page");

    return {
      success: true,
      message: "successfully deleted",
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
      message: "An error occurred",
    };
  }
};
