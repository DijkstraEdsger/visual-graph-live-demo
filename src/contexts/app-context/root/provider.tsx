"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  type ReactNode,
} from "react";
import { AppAction, AppState } from "./types";
import { appReducer } from "./reducer";
import { initialState } from "./state";

const AppContext = createContext<AppState | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<AppAction> | undefined>(
  undefined
);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </AppContext.Provider>
  );
};

export const useAppState = (): AppState => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider");
  }

  return context;
};

export const useAppDispatch = (): React.Dispatch<AppAction> => {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error("useAppDispatch must be used within an AppProvider");
  }

  return context;
};
