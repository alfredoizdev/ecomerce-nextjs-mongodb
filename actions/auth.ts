"use server";

import User from "@/models/User";
import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from "@/lib/definitions";
import connectToMongoDB from "@/lib/database";
import { Password } from "@/utils/password";
import { createSession, deleteSession } from "@/utils/session";

export const signInAction = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;

  await connectToMongoDB();

  const findUser = await User.findOne({ email }).exec();

  if (!findUser) {
    return {
      message: "This credentials are invalid.",
    };
  }

  // 3. Compare the password
  const passwordsMatch = await Password.compare(findUser.password, password);

  if (!passwordsMatch) {
    return {
      message: "This credentials are invalid.",
    };
  }

  const userId = findUser.id.toString();
  await createSession(userId);
};

export const signUpAction = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password, name } = validatedFields.data;

  await connectToMongoDB();

  const userExists = await User.findOne({ email }).exec();

  if (userExists) {
    return {
      message: "An account with that email already exists.",
    };
  }

  const user = User.build({ email, password, name });
  await user.save();

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  console.log(user);
};

export const signOutAction = async () => {
  await deleteSession();
};
