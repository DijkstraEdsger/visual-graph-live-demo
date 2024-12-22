export interface UIState {
  saveDocumentModal: SaveDocumentModalState;
  openDocumentModal: OpenDocumentModalState;
  confirmSaveModal: ConfirmSaveModalState;
}

export enum UIActionType {
  UI_OPEN_SAVE_DOCUMENT_MODAL = "UI_OPEN_SAVE_DOCUMENT_MODAL",
  UI_CLOSE_SAVE_DOCUMENT_MODAL = "UI_CLOSE_SAVE_DOCUMENT_MODAL",
  UI_OPEN_OPEN_DOCUMENT_MODAL = "UI_OPEN_OPEN_DOCUMENT_MODAL",
  UI_CLOSE_OPEN_DOCUMENT_MODAL = "UI_CLOSE_OPEN_DOCUMENT_MODAL",
  UI_OPEN_CONFIRM_SAVE_MODAL = "UI_OPEN_CONFIRM_SAVE_MODAL",
  UI_CLOSE_CONFIRM_SAVE_MODAL = "UI_CLOSE_CONFIRM_SAVE_MODAL",
}

// export type UIAction =
//   | { type: UIActionType.UI_OPEN_SAVE_DOCUMENT_MODAL }
//   | { type: UIActionType.UI_CLOSE_SAVE_DOCUMENT_MODAL }
//   | { type: UIActionType.UI_OPEN_OPEN_DOCUMENT_MODAL }
//   | { type: UIActionType.UI_CLOSE_OPEN_DOCUMENT_MODAL };
export type UIAction = { type: UIActionType; payload?: any };

export interface SaveDocumentModalState {
  isOpen: boolean;
}

export interface OpenDocumentModalState {
  isOpen: boolean;
}

export interface ConfirmSaveModalState {
  isOpen: boolean;
  data: {
    name: string | null;
  };
}
