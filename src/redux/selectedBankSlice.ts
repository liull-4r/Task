import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedState {
  selected: any[]; // Now store the full row objects
}

const initialState: SelectedState = {
  selected: [],
};

export const selectedBankSlice = createSlice({
  name: "selectedBanks",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
    },
    clearSelected: (state) => {
      state.selected = [];
    },
  },
});

export const { setSelected, clearSelected } = selectedBankSlice.actions;
export default selectedBankSlice.reducer;
