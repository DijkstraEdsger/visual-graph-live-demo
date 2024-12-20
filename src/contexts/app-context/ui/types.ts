export interface UIState {
  saveDocumentModal: SaveDocumentModalState;
  openDocumentModal: OpenDocumentModalState;
}

export enum UIActionType {
  UI_OPEN_SAVE_DOCUMENT_MODAL = "UI_OPEN_SAVE_DOCUMENT_MODAL",
  UI_CLOSE_SAVE_DOCUMENT_MODAL = "UI_CLOSE_SAVE_DOCUMENT_MODAL",
  UI_OPEN_OPEN_DOCUMENT_MODAL = "UI_OPEN_OPEN_DOCUMENT_MODAL",
  UI_CLOSE_OPEN_DOCUMENT_MODAL = "UI_CLOSE_OPEN_DOCUMENT_MODAL",
}

// export type UIAction =
//   | { type: UIActionType.UI_OPEN_SAVE_DOCUMENT_MODAL }
//   | { type: UIActionType.UI_CLOSE_SAVE_DOCUMENT_MODAL }
//   | { type: UIActionType.UI_OPEN_OPEN_DOCUMENT_MODAL }
//   | { type: UIActionType.UI_CLOSE_OPEN_DOCUMENT_MODAL };
export type UIAction = { type: UIActionType };

export interface SaveDocumentModalState {
  isOpen: boolean;
}

export interface OpenDocumentModalState {
  isOpen: boolean;
}
