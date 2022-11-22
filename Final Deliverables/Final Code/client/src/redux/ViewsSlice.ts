import { createSlice } from "@reduxjs/toolkit";
import { VIEWS } from "../constants/Views";

interface ViewState {
  view: VIEWS;
  from: VIEWS;
  modal: VIEWS;
}

let INIT_STATE: ViewState = {
  view: VIEWS.LOADING,
  from: VIEWS.LOADING,
  modal: VIEWS.LOADING,
};

const viewSlice = createSlice({
  name: "views",
  initialState: INIT_STATE,
  reducers: {
    updateViewState: (state, action) => {
      state.view = action.payload.to;
      state.from = action.payload.from;
    },
    updateModalView: (state, action) => {
      state.modal = action.payload.modal;
      state.from = action.payload.from;
    },
  },
});

export const { updateViewState, updateModalView } = viewSlice.actions;

export const selectViewState = ({ views }: { views: ViewState }) => views;

export default viewSlice.reducer;
