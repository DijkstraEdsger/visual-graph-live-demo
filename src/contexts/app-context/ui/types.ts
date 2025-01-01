export interface UIState {
  saveDocumentModal: SaveDocumentModalState;
  openDocumentModal: OpenDocumentModalState;
  confirmSaveModal: ConfirmSaveModalState;
  wantToSaveModal: WantToSaveModalState;
  mousePosition: MousePositionState | null;
  confirmDeleteModal: ConfirmDeleteModalState;
  transitionSpeedSetting: TransitionSpeedSettingModalState;
  aboutModal: AboutModalState;
}

export enum UIActionType {
  UI_OPEN_SAVE_DOCUMENT_MODAL = "UI_OPEN_SAVE_DOCUMENT_MODAL",
  UI_CLOSE_SAVE_DOCUMENT_MODAL = "UI_CLOSE_SAVE_DOCUMENT_MODAL",
  UI_OPEN_OPEN_DOCUMENT_MODAL = "UI_OPEN_OPEN_DOCUMENT_MODAL",
  UI_CLOSE_OPEN_DOCUMENT_MODAL = "UI_CLOSE_OPEN_DOCUMENT_MODAL",
  UI_OPEN_CONFIRM_SAVE_MODAL = "UI_OPEN_CONFIRM_SAVE_MODAL",
  UI_CLOSE_CONFIRM_SAVE_MODAL = "UI_CLOSE_CONFIRM_SAVE_MODAL",
  UI_OPEN_WANT_TO_SAVE_MODAL = "UI_OPEN_WANT_TO_SAVE_MODAL",
  UI_CLOSE_WANT_TO_SAVE_MODAL = "UI_CLOSE_WANT_TO_SAVE_MODAL",
  UI_SET_MOUSE_POSITION = "UI_SET_MOUSE_POSITION",
  UI_OPEN_CONFIRM_DELETE_MODAL = "UI_OPEN_CONFIRM_DELETE_MODAL",
  UI_CLOSE_CONFIRM_DELETE_MODAL = "UI_CLOSE_CONFIRM_DELETE_MODAL",
  UI_OPEN_TRANSITION_SPEED_SETTING_MODAL = "UI_OPEN_TRANSITION_SPEED_SETTING_MODAL",
  UI_CLOSE_TRANSITION_SPEED_SETTING_MODAL = "UI_CLOSE_TRANSITION_SPEED_SETTING_MODAL",
  UI_OPEN_ABOUT_MODAL = "UI_OPEN_ABOUT_MODAL",
  UI_CLOSE_ABOUT_MODAL = "UI_CLOSE_ABOUT_MODAL",
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

export interface WantToSaveModalState {
  isOpen: boolean;
}

export interface MousePositionState {
  x: number;
  y: number;
}

export interface ConfirmDeleteModalState {
  isOpen: boolean;
  data: {
    name: string | null;
  };
}

export interface TransitionSpeedSettingModalState {
  isOpen: boolean;
}

export interface AboutModalState {
  isOpen: boolean;
}
