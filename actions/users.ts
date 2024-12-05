"use server";

import User from "@/models/User";
import { TUser } from "@/types/User";
// import { revalidatePath } from "next/cache";

export const getUsersAction = async (): Promise<{
  data: TUser[];
  success: boolean;
  message: string;
}> => {
  const user = await User.find({}).exec();

  const results = JSON.parse(JSON.stringify(user));

  return {
    data: results,
    success: true,
    message: "Users fetched",
  };
};
