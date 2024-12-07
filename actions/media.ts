"use server";

import cloudinary from "@/lib/cloudinary";
import Media from "@/models/Media";
import { DTOMedia } from "@/types/Media";
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
    public_id: mediaId,
    secure_url: mediaId,
    resource_type: "image",
  });

  await media.save();
};
