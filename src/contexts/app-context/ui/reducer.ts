import { type UIAction, UIActionType, type UIState } from "./types";

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case UIActionType.UI_OPEN_SAVE_DOCUMENT_MODAL:
      return {
        ...state,
        saveDocumentModal: {
          isOpen: true,
        },
      };
    case UIActionType.UI_CLOSE_SAVE_DOCUMENT_MODAL:
      return {
        ...state,
        saveDocumentModal: {
          isOpen: false,
        },
      };
    case UIActionType.UI_OPEN_OPEN_DOCUMENT_MODAL:
      return {
        ...state,
        openDocumentModal: {
          isOpen: true,
        },
      };
    case UIActionType.UI_CLOSE_OPEN_DOCUMENT_MODAL:
      return {
        ...state,
        openDocumentModal: {
          isOpen: false,
        },
      };
    case UIActionType.UI_OPEN_CONFIRM_SAVE_MODAL:
      return {
        ...state,
        confirmSaveModal: {
          isOpen: true,
          data: {
            name: action.payload,
          },
        },
      };
    case UIActionType.UI_CLOSE_CONFIRM_SAVE_MODAL:
      return {
        ...state,
        confirmSaveModal: {
          isOpen: false,
          data: {
            name: null,
          },
        },
      };

    default:
      return state;
  }
};