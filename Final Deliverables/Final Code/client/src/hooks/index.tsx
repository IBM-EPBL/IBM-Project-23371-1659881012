import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import useToggle from "./useToggle";
import useAuth from "./useAuth";
import useWallet from "./useWallet";
import useExpenses from "./useExpenses";
import useViews from "./useViews";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useToggle, useAuth, useExpenses, useWallet, useViews };
