"use server";

import cloudinary from "@/lib/cloudinary";
import HomeTheme from "@/models/HomeTheme";
import Media from "@/models/Media";
import Product from "@/models/Product";
import User from "@/models/User";
import { DTOMedia } from "@/types/Media";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getCouldImageAction = cache(async (): Promise<DTOMedia[]> => {
  try {
    // Fetch images from Cloudinary with a max result limit
    const res = await cloudinary.search
      .expression("resource_type:image") // Specify image type explicitly for clarity
      .max_results(100) // Adjust the maximum results as needed
      .execute();

    // Ensure the resources exist and are valid
    if (res.resources && Array.isArray(res.resources)) {
      return res.resources as DTOMedia[];
    }

    return [];
  } catch (err) {
    console.error(
      "Error fetching media from Cloudinary:",
      err instanceof Error ? err.message : err
    );
    return [];
  }
});

// export const setRelationShipOfMedia = async (
//   mediaId: string,
//   id: string,
//   type: "user" | "product" | "hero"
// ) => {
//   const media = Media.build({
//     entityId: id,
//     type,
//     publicId: mediaId,
//     secureUrl: mediaId,
//     resourceType: "image",
//   });

//   await media.save();
// };

export const setRelationShipOfMedia = async (
  mediaId: string,
  id: string,
  type: "user" | "product" | "hero"
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    // Check if a media with the same publicId already exists
    const existingMedia = await Media.findOne({ publicId: mediaId });

    if (existingMedia) {
      // Update the existing media relationship
      existingMedia.entityId = id;
      existingMedia.type = type;

      await existingMedia.save();

      return {
        success: true,
        message: "Existing media relationship updated successfully.",
      };
    }

    // Create new media relationship if it doesn't exist
    const media = Media.build({
      entityId: id,
      type,
      publicId: mediaId, // Ensure this is unique
      resourceType: "image", // Default to image, adjust as necessary
    });

    await media.save();

    return {
      success: true,
      message: "Media relationship created successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while setting the media relationship.",
    };
  }
};

export const deleteMediaAction = async (
  publicImageId: string
): Promise<{
  message: string;
  success: boolean;
}> => {
  console.log("publicImageId", publicImageId);

  try {
    await cloudinary.uploader.destroy(publicImageId);

    const entity = await Media.findOne({ publicId: publicImageId });

    if (entity) {
      const updatedEntity = await updateEntityByType(
        entity.type,
        entity.entityId
      );

      if (updatedEntity) {
        updatedEntity.save();
      }
      await Media.deleteMany({ entityId: entity.entityId });
    }

    revalidatePath("/admin/media", "page");

    return {
      message: "Media deleted successfully",
      success: true,
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);

      return {
        message: err.message,
        success: false,
      };
    }

    return {
      message: "An error occurred",
      success: false,
    };
  }
};

const updateEntityByType = async (entityType: string, entityId: string) => {
  switch (entityType) {
    case "user":
      return await User.findByIdAndUpdate(entityId, {
        avatar: "/images/not-profile-image.webp",
      });

    case "product":
      return await Product.findByIdAndUpdate(entityId, {
        image: "/images/not-image.webp",
      });
    case "hero":
      return await HomeTheme.findByIdAndUpdate(entityId, {
        "hero.bannerImage": "/images/shoes/red/red-banner.webp",
      });
    default:
      throw new Error(`Unsupported media type: ${entityId}`);
  }
};
