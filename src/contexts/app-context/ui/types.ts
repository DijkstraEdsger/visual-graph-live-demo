export interface UIState {
  saveDocumentModal: SaveDocumentModalState;
}

export enum UIActionType {
  UI_OPEN_SAVE_DOCUMENT_MODAL = "UI_OPEN_SAVE_DOCUMENT_MODAL",
  UI_CLOSE_SAVE_DOCUMENT_MODAL = "UI_CLOSE_SAVE_DOCUMENT_MODAL",
}

export type UIAction =
  | { type: UIActionType.UI_OPEN_SAVE_DOCUMENT_MODAL }
  | { type: UIActionType.UI_CLOSE_SAVE_DOCUMENT_MODAL };

export interface SaveDocumentModalState {
  isOpen: boolean;
}
