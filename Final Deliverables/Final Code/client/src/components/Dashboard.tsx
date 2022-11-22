import React, { useEffect } from "react";
import AddExpenses from "./AddExpenses";
import Card from "./common/Card";
import Container from "./Container";
import ListExpenses from "./ListExpenses";
import { FaRupeeSign } from "react-icons/fa";
import { PieChart } from "react-minimal-pie-chart";
import { useAuth, useExpenses, useViews, useWallet } from "../hooks";
import CreateWalletModal from "./CreateWalletModal";
import { VIEWS } from "../constants/Views";
import Loader from "./common/Loader";
import UpdateWalletModal from "./UpdateWalletModal";

const Dashboard = () => {
  const auth = useAuth();
  const views = useViews();
  const expenses = useExpenses();
  const wallet = useWallet();

  useEffect(() => {
    expenses.get(auth.id as number);
    wallet.get(auth.id as number);
    expenses.fetchCategories(auth.id as number);
  }, []); //eslint-disable-line

  return (
    <Container>
      <section className="w-full px-40 flex items-start justify-between">
        <section className="w-1/3 flex flex-col gap-10">
          <Card title="Remaining Limit">
            {wallet.loading ? (
              <Loader />
            ) : (
              <div className="flex items-center mb-4 gap-1">
                <FaRupeeSign className="text-2xl" />
                <span
                  className={`text-4xl ${
                    wallet.limit > 0 ? "text-accent" : "text-red-600"
                  } `}>
                  {wallet.limit}
                </span>
              </div>
            )}
          </Card>
          <Card title="Category">
            {expenses.category_loading ? (
              <Loader />
            ) : (
              <>
                <PieChart data={expenses.category_spent} />
                <div className="flex items-center gap-2 w-full justify-center">
                  {expenses.category_spent.map((category: any, idx: number) => {
                    return category.value > 0 ? (
                      <div className="flex items-center gap-1">
                        <div
                          key={category.title}
                          className={`h-2 w-4 bg-[${category.color}]`}
                          style={{
                            backgroundColor: `${category.color}`,
                          }}></div>
                        <span className="text-black">{category.title}</span>
                      </div>
                    ) : (
                      <></>
                    );
                  })}
                </div>
              </>
            )}
          </Card>
          <Card title="Most Spent">
            {expenses.expenses_loading ? (
              <Loader />
            ) : (
              <div className="flex items-center mb-4 gap-1">
                <FaRupeeSign className="text-2xl" />
                <span className="text-4xl text-accent">
                  {expenses.most_spent}
                </span>
              </div>
            )}
          </Card>
          <Card title="Total Spent">
            {expenses.expenses_loading ? (
              <Loader />
            ) : (
              <div className="flex items-center mb-4 gap-1">
                <FaRupeeSign className="text-2xl" />
                <span className="text-4xl text-accent">
                  {expenses.total_spent}
                </span>
              </div>
            )}
          </Card>
        </section>
        <section className="w-2/3 flex flex-col gap-10 items-center pl-20">
          <AddExpenses />
          {expenses.expenses_loading ? <Loader /> : <ListExpenses />}
        </section>
        {views.modal === VIEWS.CREATEWALLETMODAL && <CreateWalletModal />}
        {views.modal === VIEWS.WALLETMODAL && <UpdateWalletModal />}
      </section>
    </Container>
  );
};

export default Dashboard;
