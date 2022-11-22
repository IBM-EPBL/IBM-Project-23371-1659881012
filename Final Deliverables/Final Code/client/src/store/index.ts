import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../redux/AuthSlice";
import viewsReducer from "../redux/ViewsSlice";
import toastsReduer from "../redux/ToastSlice";
import expenseReduer from "../redux/ExpenseSlice";
import walleteReduer from "../redux/WalletSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    views: viewsReducer,
    toasts: toastsReduer,
    expense: expenseReduer,
    wallet: walleteReduer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
