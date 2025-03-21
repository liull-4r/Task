import { configureStore } from "@reduxjs/toolkit";
import selectedBankReducer from "./selectedBankSlice";

export const store = configureStore({
  reducer: {
    selectedBanks: selectedBankReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
