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

export const setRelationShipOfMedia = async (
  mediaId: string,
  id: string,
  type: "user" | "product" | "hero"
) => {
  const media = Media.build({
    entityId: id,
    type,
    publicId: mediaId,
    secureUrl: mediaId,
    resourceType: "image",
  });

  await media.save();
};

export const deleteMediaAction = async (
  publicImageId: string
): Promise<{
  message: string;
  success: boolean;
}> => {
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
      await Media.deleteOne({ entityId: entity.entityId });
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
