export interface AlgorithmState {
  selected: string | null;
  isRunning: boolean;
  isShowingResult: boolean;
}

export enum AlgorithmActionType {
  SET_SELECTED_ALGORITHM = "SET_SELECTED_ALGORITHM",
  SET_IS_ALGORITHM_RUNNING = "SET_IS_ALGORITHM_RUNNING",
  SET_IS_ALGORITHM_SHOWING_RESULT = "SET_IS_ALGORITHM_SHOWING_RESULT",
}

interface SetSelectedAlgorithmAction {
  type: AlgorithmActionType.SET_SELECTED_ALGORITHM;
  payload: string;
}

interface SetIsAlgorithmRunningAction {
  type: AlgorithmActionType.SET_IS_ALGORITHM_RUNNING;
  payload: boolean;
}

interface SetIsAlgorithmShowingResultAction {
  type: AlgorithmActionType.SET_IS_ALGORITHM_SHOWING_RESULT;
  payload: boolean;
}

export type AlgorithmAction =
  | SetSelectedAlgorithmAction
  | SetIsAlgorithmRunningAction
  | SetIsAlgorithmShowingResultAction;
