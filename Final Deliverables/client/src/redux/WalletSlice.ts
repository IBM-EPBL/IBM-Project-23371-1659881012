import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addWallet, getWallet, updateWallet } from "../services/wallet";
import { WalletType } from "../types/wallet";

let INIT_STATE: WalletType = {
  id: 0,
  user_id: 0,
  amount: 0,
  threshold: 0,
  loading: false,
};

export const fetchWallet = createAsyncThunk(
  "wallet/fetchWallet",
  async (id: number) => {
    return new Promise(async (resolve, reject) => {
      await getWallet(id)
        .then((data: any) => resolve(data))
        .catch((data) => reject(data));
    });
  }
);

export const createWallet = createAsyncThunk(
  "wallet/createWallet",
  async (body: WalletType) => {
    return new Promise(async (resolve, reject) => {
      await addWallet(body)
        .then((data: any) => resolve(data))
        .catch((data: any) => reject(data));
    });
  }
);

export const updateThreshold = createAsyncThunk(
  "wallet/updateThreshold",
  async (body: any) => {
    return new Promise(async (resolve, reject) => {
      await updateWallet(body)
        .then((data: any) => resolve(data))
        .catch((data) => reject(data));
    });
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: INIT_STATE,
  reducers: {
    clearWalletState: (state) => {
      state = INIT_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWallet.fulfilled, (state, action: any) => {
        state.id = action.payload.data.wallet.id;
        state.user_id = action.payload.data.wallet.user_id;
        state.amount = action.payload.data.wallet.amount;
        state.threshold = action.payload.data.wallet.threshold;
        state.loading = false;
      })
      .addCase(fetchWallet.rejected, (state, action: any) => {
        state.loading = false;
      })
      .addCase(createWallet.pending, (state) => {})
      .addCase(createWallet.fulfilled, (state, action: any) => {
        state.id = action.payload.data.wallet.id;
        state.user_id = action.payload.data.wallet.user_id;
        state.amount = action.payload.data.wallet.amount;
        state.threshold = action.payload.data.wallet.threshold;
        toast.success(action.payload.message);
      })
      .addCase(createWallet.rejected, (state, action: any) => {
        toast.error(action.payload.message);
      })
      .addCase(updateThreshold.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateThreshold.fulfilled, (state, action: any) => {
        state.loading = false;
      })
      .addCase(updateThreshold.rejected, (state, action: any) => {
        state.loading = false;
      });
  },
});

export const { clearWalletState } = walletSlice.actions;

export const selectWalletState = ({ wallet }: { wallet: WalletType }) => wallet;

export default walletSlice.reducer;
