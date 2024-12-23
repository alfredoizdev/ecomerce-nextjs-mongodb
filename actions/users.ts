"use server";

import User from "@/models/User";
import {
  FormState,
  SignupFormSchema,
  UpdateUserFormSchema,
  UpdateUserDetailFormSchema,
  FormUserDetailState,
} from "@/lib/definitions";
import connectToMongoDB from "@/lib/database";
import { TUser, TUserDetailDTO } from "@/types/User";
import { setRelationShipOfMedia } from "./media";
import UserDetail from "@/models/UserDetail";
import { revalidatePath } from "next/cache";

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
    publicImageId: formData.get("publicImageId"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password, name, avatar, publicImageId } = validatedFields.data;

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
    avatar: avatar || "",
  });

  await user.save();

  if (!user) {
    return {
      success: false,
      message: "An error occurred while creating your account.",
    };
  }

  if (publicImageId) {
    await setRelationShipOfMedia(publicImageId, user.id, "user");
  }

  return {
    success: true,
    message: "User created",
  };
};

export const getUserByIdAction = async (
  id: string
): Promise<{
  data: TUser | null;
  success: boolean;
  message: string;
}> => {
  await connectToMongoDB();

  const findUser = await User.findById(id).exec();

  if (!findUser) {
    return {
      data: null,
      success: false,
      message: "User not found",
    };
  }

  return {
    data: JSON.parse(JSON.stringify(findUser)),
    success: true,
    message: "User found",
  };
};

export const updateUserAction = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  const validatedFields = UpdateUserFormSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    avatar: formData.get("avatar"),
    publicImageId: formData.get("publicImageId"),
    id: formData.get("id"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, name, avatar, id, publicImageId } = validatedFields.data;

  await connectToMongoDB();

  const user = await User.findById(id).exec();

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (publicImageId) {
    await setRelationShipOfMedia(publicImageId, user.id, "user");
  }

  user.email = email;
  user.name = name;
  user.avatar = avatar?.toString() || "";

  await user.save();

  return {
    success: true,
    message: "User updated",
  };
};

export const updateUserDetailsAction = async (
  state: FormUserDetailState,
  formData: FormData
): Promise<FormUserDetailState> => {
  try {
    const validatedFields = UpdateUserDetailFormSchema.safeParse({
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      country: formData.get("country"),
      id: formData.get("id"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
        message: "Invalid fields",
      };
    }

    const {
      phone,
      address,
      city,
      state: stateCountry,
      zipCode,
      country,
      id,
    } = validatedFields.data;

    await connectToMongoDB();

    const currentUser = await User.findById(id).exec();

    if (!currentUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const userDetail = await UserDetail.findOne({
      user: currentUser.id,
    }).exec();

    if (!userDetail) {
      const newUserDetail = UserDetail.build({
        user: currentUser.id,
        phone,
        address,
        city,
        state: stateCountry,
        zipCode,
        country,
      });

      await newUserDetail.save();
      revalidatePath(`/member/profile`, "page");
      return {
        success: true,
        message: "User details created",
      };
    }

    userDetail.phone = phone;
    userDetail.address = address;
    userDetail.city = city;
    userDetail.state = stateCountry;
    userDetail.zipCode = zipCode;
    userDetail.country = country;

    await userDetail.save();
    revalidatePath(`/member/profile`, "page");

    return {
      success: true,
      message: "User details updated",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);

      return {
        success: false,
        message: `An error occurred: ${error.message}`,
      };
    }

    return {
      success: false,
      message: `An error occurred`,
    };
  }
};

export const getUserDetailByUserId = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
  data: TUserDetailDTO | null;
}> => {
  await connectToMongoDB();

  const userDetail = await UserDetail.findOne({ user: id }).exec();

  if (!userDetail) {
    return {
      success: false,
      message: `An error occurred`,
      data: null,
    };
  }

  return {
    success: true,
    message: "",
    data: JSON.parse(JSON.stringify(userDetail)),
  };
};

export const uploadUserAvatar = async (userid: string, ImageUrl: string) => {
  await connectToMongoDB();

  const user = await User.findById(userid).exec();

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  user.avatar = ImageUrl;
  await user.save();

  revalidatePath("/member/profile", "page");

  return {
    success: true,
    message: "Avatar uploaded",
  };
};
