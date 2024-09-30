import { StateCreator } from "zustand";
import { StoreState } from "../store";

export type SettingsState = {
  currentTheme: any;
  setCurrentTheme: (theme: any) => void;
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  helpOpen: boolean;
  setHelpOpen: (helpOpen: boolean) => void;
};

export const createSettingsSlice: StateCreator<
  StoreState,
  [],
  [],
  SettingsState
> = (set, get) => ({
  currentTheme: null,
  setCurrentTheme: (theme: any) => set({ currentTheme: theme }),
  menuOpen: false,
  setMenuOpen: (menuOpen: boolean) => set({ menuOpen: menuOpen }),
  helpOpen: false,
  setHelpOpen: (helpOpen: boolean) => set({ helpOpen: helpOpen }),
});
