import { create } from "zustand";

type InitialState = {
  isMobileMenuOpen: boolean;
  homeTheme: {
    background: string;
    text: string;
    backgroundBtn: string;
    textBtn: string;
    heroTitle: string;
    heroSubtitle: string;
    heroBannerImage: string;
    cardColor: string;
  };
  toggleMobileMenu: () => void;
  setHomeTheme: (theme: InitialState["homeTheme"]) => void;
};

const useUiStore = create<InitialState>((set) => ({
  isMobileMenuOpen: false,
  homeTheme: {
    primary: "",
    secondary: "",
    background: "",
    text: "",
    backgroundBtn: "",
    textBtn: "",
    heroTitle: "",
    heroSubtitle: "",
    heroBannerImage: "",
    cardColor: "",
  },
  setHomeTheme: (theme) => set(() => ({ homeTheme: theme })),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));

export default useUiStore;
