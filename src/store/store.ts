import { create } from "zustand";

import { GameState, createGameSlice } from "./slices/gameSlice";
import { SettingsState, createSettingsSlice } from "./slices/settingsSlice";

export type StoreState = GameState & SettingsState;

const useStore = create<StoreState>()((...a) => ({
  ...createGameSlice(...a),
  ...createSettingsSlice(...a),
}));

export default useStore;
