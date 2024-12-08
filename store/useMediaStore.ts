import { getCouldImageAction } from "@/actions/media";
import { DTOMedia } from "@/types/Media";
import { create } from "zustand";

type MediaState = {
  mediaList: DTOMedia[];
  currentMedia: DTOMedia | null;
  getMediaList: () => void;
  setCurrentMedia: (media: DTOMedia) => void;
};

export const useMediaStore = create<MediaState>((set) => ({
  mediaList: [],
  currentMedia: null,
  getMediaList: async () => {
    const media = await getCouldImageAction();

    set({ mediaList: media });
  },
  setCurrentMedia: (media) => set({ currentMedia: media }),
}));
