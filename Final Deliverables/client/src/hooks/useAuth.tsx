import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector, useViews } from ".";
import { VIEWS } from "../constants/Views";
import { fetchUser, selectAuthState } from "../redux/AuthSlice";
import {
  login as loginUser,
  logout as logoutUser,
  register as registerUser,
} from "../redux/AuthSlice";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const views = useViews();

  const auth = useAppSelector(selectAuthState);

  const login = (body: any) => {
    dispatch(loginUser(body)).then((data: any) => {
      if (data.payload) {
        toast.success(data.payload.message);
        views.goTo(VIEWS.DASHBOARD);
      } else toast.error(data.error.message);
    });
  };

  const logout = () => {
    dispatch(logoutUser()).then((data: any) => {
      if (data.payload) {
        toast.success(data.payload.message);
        views.goTo(VIEWS.LOGIN);
      } else toast.error(data.error.message);
    });
  };

  const register = (body: any) => {
    dispatch(registerUser(body)).then((data: any) => {
      if (data.payload) {
        toast.success(data.payload.message);
        views.goTo(VIEWS.DASHBOARD);
      } else toast.error(data.error.message);
    });
  };

  const checkSession = () => {
    if (localStorage.getItem("user_id")) return true;
    else return false;
  };

  const getUser = () => {
    if (checkSession() && !auth.isLoggedin)
      dispatch(fetchUser(localStorage.getItem("user_id") as string)).then(
        (data: any) => {
          if (data.payload) {
            toast.success(data.payload.message);
            views.goTo(VIEWS.DASHBOARD);
          } else toast.error(data.error.message);
        }
      );
    else views.goTo(VIEWS.LOGIN);
  };

  return {
    id: auth.user?.id,
    name: auth.user?.name,
    email: auth.user?.email,
    isLoggedin: auth.isLoggedin,
    message: auth.message,
    status: auth.status,
    login,
    register,
    logout,
    init_auth: getUser,
  };
};

export default useAuth;
