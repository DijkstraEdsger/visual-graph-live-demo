import type { AppState } from "./types";
import { initialState as initialUIState } from "../ui/state";

export const initialState: AppState = {
  ui: initialUIState,
};
