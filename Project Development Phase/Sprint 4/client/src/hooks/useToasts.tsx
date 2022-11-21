import { useAppDispatch, useAppSelector } from ".";
import { TOAST } from "../constants/Toasts";
import { selectToastState, updateToastState } from "../redux/ToastSlice";
import { toast } from "react-toastify";

const useToasts = () => {
  const dispatch = useAppDispatch();

  const toastState = useAppSelector(selectToastState);

  const show = (message: string, type: TOAST) => {
    dispatch(updateToastState({ message, type }));
    toastNow();
  };

  const toastNow = () => {
    if (toastState.message !== "") {
      if (toastState.type === TOAST.SUCCESS) toast.success(toastState.message);
      if (toastState.type === TOAST.ERROR) toast.error(toastState.message);
      if (toastState.type === TOAST.WARN) toast.warn(toastState.message);
    }
    dispatch(updateToastState({ message: "", type: TOAST.WARN }));
  };

  return {
    show,
  };
};

export default useToasts;
