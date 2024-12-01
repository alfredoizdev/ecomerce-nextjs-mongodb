import { create } from "zustand";

type InitialState = {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
};

const useUiStore = create<InitialState>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));

export default useUiStore;
