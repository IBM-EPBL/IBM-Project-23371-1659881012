import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthType } from "../types/auth";
import {
  login as loginUser,
  logout as logoutUser,
  register as registerUser,
  getUser,
} from "../services/auth";

interface AuthState {
  isLoggedin: boolean;
  user: AuthType | null;
  token: string;
  status: string;
  message: string;
}

let INIT_STATE: AuthState = {
  isLoggedin: false,
  user: null,
  token: "",
  status: "idle",
  message: "",
};

export const logout = createAsyncThunk("auth/logout", async () => {
  return new Promise(async (resolve, reject) => {
    await logoutUser()
      .then((data: any) => resolve(data))
      .catch((data) => reject(data));
  });
});

export const register = createAsyncThunk("auth/register", async (body: any) => {
  return new Promise(async (resolve, reject) => {
    await registerUser(body)
      .then((data: any) => resolve(data))
      .catch((data) => reject(data));
  });
});

export const login = createAsyncThunk("auth/login", async (body: any) => {
  return new Promise(async (resolve, reject) => {
    await loginUser(body)
      .then((data: any) => resolve(data))
      .catch((data: any) => reject(data));
  });
});

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (id: string) => {
    return new Promise(async (resolve, reject) => {
      await getUser(id)
        .then((data: any) => resolve(data))
        .catch((data) => reject(data));
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INIT_STATE,
  reducers: {
    clearAuthState: (state) => {
      state = INIT_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action: any) => {
        state.status = "success";
        state.message = action.payload.message;
        state.user = action.payload.data?.user;
        state.isLoggedin = true;
        localStorage.setItem("user_id", action.payload.data?.user.id);
      })
      .addCase(login.rejected, (state, action: any) => {
        state.status = "failed";
        state.message = action.error?.message;
        state.user = null;
        state.isLoggedin = false;
        localStorage.removeItem("user_id");
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action: any) => {
        state.status = "success";
        state.message = action.payload.message;
        state.user = action.payload.data?.user;
        state.isLoggedin = true;
        localStorage.setItem("user_id", action.payload.data?.user.id);
      })
      .addCase(fetchUser.rejected, (state, action: any) => {
        state.status = "failed";
        state.message = action.error.message;
        state.user = null;
        state.isLoggedin = false;
        localStorage.removeItem("user_id");
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action: any) => {
        state.status = "success";
        state.message = action.payload.message;
        state.user = action.payload.data?.user;
        state.isLoggedin = true;
        localStorage.setItem("user_id", action.payload.data?.user.id);
      })
      .addCase(register.rejected, (state, action: any) => {
        state.status = "failed";
        state.message = action.error.message;
        state.user = null;
        state.isLoggedin = false;
        localStorage.removeItem("user_id");
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action: any) => {
        state.status = "success";
        state = INIT_STATE;
        localStorage.removeItem("user_id");
      })
      .addCase(logout.rejected, (state, action: any) => {
        state.status = "failed";
        state = INIT_STATE;
        localStorage.removeItem("user_id");
      });
  },
});

export const { clearAuthState } = authSlice.actions;

export const selectAuthState = ({ auth }: { auth: AuthState }) => auth;

export default authSlice.reducer;
