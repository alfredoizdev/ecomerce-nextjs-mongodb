import { getCouldImageAction } from "@/actions/media";
import { DTOMedia } from "@/types/Media";
import { create } from "zustand";

type MediaState = {
  isLoading: boolean;
  mediaList: DTOMedia[];
  currentMedia: DTOMedia | null;
  getMediaList: () => void;
  setCurrentMedia: (media: DTOMedia | null) => void;
};

export const useMediaStore = create<MediaState>((set) => ({
  mediaList: [],
  currentMedia: null,
  isLoading: false,
  getMediaList: async () => {
    try {
      set({ isLoading: true });

      const media = await getCouldImageAction();

      set({ mediaList: media });
    } catch (error) {
      console.error(error);
      set({ mediaList: [] });
    } finally {
      set({ isLoading: false });
    }
  },
  setCurrentMedia: (media) => set({ currentMedia: media }),
}));
