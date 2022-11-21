import React from "react";
import { FaMoneyCheck, FaWallet } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { VIEWS } from "../constants/Views";
import { useAuth, useViews } from "../hooks";

const Header = () => {
  const user = useAuth();
  const views = useViews();

  const logout = () => {
    user.logout();
    views.goTo(VIEWS.LOGIN);
  };

  return (
    <header className="flex w-full px-8 py-5 items-center justify-between text-accent  border-b-[0.5px] border-border bg-background">
      <div className="flex items-center gap-2">
        <FaMoneyCheck className="text-4xl" />
        <h1 className="font-bold text-xl">Expense Tracker</h1>
      </div>
      <div className="flex items-center gap-5">
        <span className="text-primary text-xl font-semibold">
          Welcome {user.name}!
        </span>
        <div className="flex items-center gap-4">
          <FaWallet className="text-4xl cursor-pointer hover:opacity-75" />
          <FiLogOut
            className="text-4xl cursor-pointer hover:opacity-75"
            onClick={() => logout()}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
