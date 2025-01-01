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
  wantToSaveModal: {
    isOpen: false,
  },
  mousePosition: null,
  confirmDeleteModal: {
    isOpen: false,
    data: {
      name: null,
    },
  },
  transitionSpeedSetting: {
    isOpen: false,
  },
  aboutModal: {
    isOpen: false,
  },
  instructionsModal: {
    isOpen: false,
  },
};
