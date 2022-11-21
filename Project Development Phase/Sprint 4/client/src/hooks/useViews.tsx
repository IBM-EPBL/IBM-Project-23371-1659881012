import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { VIEWS } from "../constants/Views";
import {
  selectViewState,
  updateModalView,
  updateViewState,
} from "../redux/ViewsSlice";

const useViews = () => {
  const dispatch = useAppDispatch();

  const views = useAppSelector(selectViewState);

  useEffect(() => {}, [views.view]);

  const goTo = (to: VIEWS) => {
    dispatch(updateViewState({ from: views.view, to }));
  };

  const toggleModal = (modal: VIEWS) => {
    dispatch(updateModalView({ from: views.view, modal }));
  };

  return {
    currentView: views.view,
    from: views.from,
    modal: views.modal,
    goTo,
    toggleModal,
  };
};

export default useViews;
