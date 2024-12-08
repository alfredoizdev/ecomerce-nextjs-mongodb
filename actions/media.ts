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
    const res = await cloudinary.search.expression().max_results(100).execute();

    return res.resources as DTOMedia[];
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);

      return [];
    }

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
    const entity = await Media.findOne({ publicId: publicImageId });

    if (entity) {
      switch (entity.type) {
        case "user":
          const user = await User.findByIdAndUpdate(entity.entityId, {
            avatar: "/images/not-profile-image.webp",
          });
          if (user) {
            user.save();
          }
          break;
        case "product":
          const product = await Product.findByIdAndUpdate(entity.entityId, {
            image: "/images/not-image.webp",
          });

          if (product) {
            product.save();
          }
          break;
        case "hero":
          const theme = await HomeTheme.findByIdAndUpdate(entity.entityId, {
            hero: "/images/shoes/red/red-banner.webp",
          });

          if (theme) {
            theme.save();
          }
          break;
      }
    }

    if (!entity) {
      return {
        message: "Media not found",
        success: false,
      };
    }

    await cloudinary.uploader.destroy(entity.publicId);
    await Media.deleteOne({ entityId: entity.entityId });

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
