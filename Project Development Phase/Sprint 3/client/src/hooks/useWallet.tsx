import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector, useViews } from ".";
import { VIEWS } from "../constants/Views";
import {
  createWallet,
  fetchWallet,
  selectWalletState,
} from "../redux/WalletSlice";
import { WalletType } from "../types/wallet";

const useWallet = () => {
  const dispatch = useAppDispatch();

  const views = useViews();

  const wallet = useAppSelector(selectWalletState);

  const get = (id: number) => {
    dispatch(fetchWallet(id)).then((data: any) => {
      if (data.error) views.toggleModal(VIEWS.CREATEWALLETMODAL);
    });
  };

  const create = async (body: WalletType) => {
    dispatch(createWallet(body)).then((data: any) => {
      if (data.payload) {
        toast.success(data.payload.message);
        views.goTo(views.from);
        views.toggleModal(VIEWS.LOADING);
      } else {
        toast.error(data.error.message);
      }
    });
  };

  return {
    amount: wallet.amount,
    limit: wallet.threshold,
    get,
    create,
  };
};

export default useWallet;
