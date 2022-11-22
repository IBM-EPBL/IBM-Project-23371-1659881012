import React from "react";
import { useExpenses } from "../hooks";
import { ExpenseType } from "../types/expenses";
import { CATEGORIES } from "../constants/Categories";
import Card from "./common/Card";

const ListExpenses = () => {
  const expenses = useExpenses();
  return expenses.data.length > 0 ? (
    <Card title="Your Expenses">
      <table className="w-full  table-fixed items-center mb-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody className="">
          {expenses.data.length > 0 ? (
            expenses.data.map((expense: ExpenseType) => {
              return (
                <tr key={expense.id} className="items-center text-center">
                  <td className="py-3">{expense.title}</td>
                  <td
                    className={`text-[${
                      CATEGORIES[expense.category]["color"]
                    }] `}
                    style={{
                      color: `${CATEGORIES[expense.category]["color"]}`,
                    }}>
                    {expense.category}
                  </td>
                  <td>{expense.amount}</td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </Card>
  ) : (
    <section className="flex items-center justify-center text-4xl font-semibold">
      Get Started by adding an Expense!
    </section>
  );
};

export default ListExpenses;
