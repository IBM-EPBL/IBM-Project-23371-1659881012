import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from ".";
import {
  addExpense,
  category,
  fetchExpenses,
  selectExpenseState,
} from "../redux/ExpenseSlice";
import { ExpenseType } from "../types/expenses";

const useExpenses = () => {
  const dispatch = useAppDispatch();

  const expenseState = useAppSelector(selectExpenseState);

  const get = (id: number) => {
    dispatch(fetchExpenses(id));
  };

  const add = async (body: ExpenseType) => {
    await dispatch(addExpense(body)).then((data: any) => {
      if (data.payload) toast.success(data.payload.message);
    });
  };

  const fetchCategories = (id: number) => {
    dispatch(category(id));
  };

  return {
    data: expenseState.expenses,
    most_spent: expenseState.most_spent,
    total_spent: expenseState.total_spent,
    category_spent: Object.values(expenseState.category_spent) as Array<any>,
    get,
    add,
    fetchCategories,
    category_loading: expenseState.categories_loading,
    expenses_loading: expenseState.expenses_loading,
  };
};

export default useExpenses;
