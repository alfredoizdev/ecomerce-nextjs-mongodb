"use server";

import connectToMongoDB from "@/lib/database";
import { FormStateGender, GenderFormSchema } from "@/lib/definitions";
import Gender from "@/models/Gender";
import { DTOGender } from "@/types/Gender";
import { revalidatePath } from "next/cache";

export const addGenderAction = async (
  state: FormStateGender,
  formData: FormData
): Promise<FormStateGender> => {
  const validatedFields = GenderFormSchema.safeParse({
    gender: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { gender } = validatedFields.data;

  try {
    await connectToMongoDB();

    const newGender = Gender.build({
      name: gender,
    });
    await newGender.save();

    revalidatePath("/admin/genders", "page");

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

export const getGendersAction = async (): Promise<{
  success: boolean;
  data?: DTOGender[];
  message?: string;
}> => {
  try {
    await connectToMongoDB();

    const getGenders = await Gender.find({});

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

export const deleteGenderAction = async (id: string) => {
  try {
    await connectToMongoDB();

    await Gender.findByIdAndDelete(id).exec();

    revalidatePath("/admin/genders", "page");

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
