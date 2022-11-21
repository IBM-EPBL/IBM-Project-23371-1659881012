import { createSlice } from "@reduxjs/toolkit";
import { TOAST } from "../constants/Toasts";

interface ToastState {
  message: string;
  type: TOAST;
}

let INIT_STATE: ToastState = {
  message: "",
  type: 1,
};

const toastslice = createSlice({
  name: "toasts",
  initialState: INIT_STATE,
  reducers: {
    updateToastState: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { updateToastState } = toastslice.actions;

export const selectToastState = ({ toasts }: { toasts: ToastState }) => toasts;

export default toastslice.reducer;
