"use server";

import User from "@/models/User";
import { FormState, SignupFormSchema } from "@/lib/definitions";
import connectToMongoDB from "@/lib/database";
import { TUser } from "@/types/User";
// import { revalidatePath } from "next/cache";

export const getUsersAction = async (): Promise<{
  data: TUser[];
  success: boolean;
  message: string;
}> => {
  const user = await User.find({})
    .sort({ createdAt: -1 }) // Orden descendente por fecha de creación
    .exec();

  const results = JSON.parse(JSON.stringify(user));

  return {
    data: results,
    success: true,
    message: "Users fetched",
  };
};

export const createUserAction = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    avatar: formData.get("image"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password, name, avatar } = validatedFields.data;

  await connectToMongoDB();

  const userExists = await User.findOne({ email }).exec();

  if (userExists) {
    return {
      success: false,
      message: "An account with that email already exists.",
    };
  }

  const user = User.build({
    email,
    password,
    name,
    role: "user",
    avatar: avatar?.toString() || "",
  });

  await user.save();

  if (!user) {
    return {
      success: false,
      message: "An error occurred while creating your account.",
    };
  }

  return {
    success: true,
    message: "User created",
  };
};
