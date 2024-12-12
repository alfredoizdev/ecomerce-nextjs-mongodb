"use server";

import connectToMongoDB from "@/lib/database";
import Camp from "@/models/Camp";
import { TCamp } from "@/types/Camp";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

export const createOrUpdateCampsAction = async (data: TCamp[]) => {
  if (!process.env.NEXT_PUBLIC_FOLDER_CLOUDINARY) {
    return {
      success: false,
      message: "Missing environment variable NEXT_PUBLIC_FOLDER_CLOUDINARY",
    };
  }

  const folder = process.env.NEXT_PUBLIC_FOLDER_CLOUDINARY;

  try {
    await connectToMongoDB();

    const existingCamps = await Camp.find({});
    const existingPublicIds = existingCamps.map((camp) => camp.publicImageId);

    const promises = data.map(async (camp) => {
      if (camp.image) {
        const publicImageId =
          camp.publicImageId?.replace(`${folder}/`, "") || undefined;
        const image = await cloudinary.uploader.upload(camp.image, {
          resource_type: "image",
          folder: `/${folder}`,
          public_id: publicImageId,
        });

        camp.image = image.secure_url;
        camp.publicImageId = image.public_id;
      }

      return camp;
    });

    data = await Promise.all(promises);

    // // Find public_ids to delete
    const newPublicIds = data.map((camp) => camp.publicImageId);
    const publicIdsToDelete = existingPublicIds.filter(
      (id) => !newPublicIds.includes(id)
    );

    // // Delete unused images from Cloudinary
    if (publicIdsToDelete.length > 0) {
      await cloudinary.api.delete_resources(publicIdsToDelete);
    }

    await Camp.deleteMany({});

    await Camp.insertMany(data);

    revalidatePath("/admin/camp");

    return {
      success: true,
      message: "Campaign created successfully",
    };
  } catch (error) {
    if (error) {
      console.log(error);
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getCampsAction = async (): Promise<{
  success: boolean;
  results: TCamp[] | [];
  message: string;
}> => {
  try {
    await connectToMongoDB();
    const camps = await Camp.find({});

    if (!camps.length) {
      return {
        success: false,
        results: [],
        message: "No camps found",
      };
    }

    return {
      success: true,
      results: JSON.parse(JSON.stringify(camps)),
      message: "Camps fetched successfully",
    };
  } catch (error) {
    if (error) {
      if (error instanceof Error) {
        return {
          success: false,
          results: [],
          message: error.message,
        };
      }
    }

    return {
      success: false,
      results: [],
      message: "Something went wrong",
    };
  }
};
