import type { UIState } from "./types";

export const initialState: UIState = {
  saveDocumentModal: {
    isOpen: false,
  },
  openDocumentModal: {
    isOpen: false,
  },
  confirmSaveModal: {
    isOpen: false,
    data: {
      name: null,
    },
  },
};