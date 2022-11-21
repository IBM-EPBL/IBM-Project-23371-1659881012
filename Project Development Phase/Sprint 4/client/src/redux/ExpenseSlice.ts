import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CATEGORIES } from "../constants/Categories";
import {
  addExpenses,
  expenseCategories,
  getExpenses,
} from "../services/expenses";
import { ExpenseType } from "../types/expenses";

interface ExpenseState {
  expenses: Array<ExpenseType>;
  total_spent: number;
  most_spent: number;
  category_spent: any;
  expenses_loading: boolean;
  categories_loading: boolean;
}

let INIT_STATE: ExpenseState = {
  expenses: [],
  total_spent: 0,
  most_spent: 0,
  category_spent: CATEGORIES,
  expenses_loading: false,
  categories_loading: false,
};

export const addExpense = createAsyncThunk(
  "expense/add",
  async (body: ExpenseType) => {
    return new Promise(async (resolve, reject) => {
      await addExpenses(body)
        .then((data: any) => resolve(data))
        .catch((data) => reject(data));
    });
  }
);

export const fetchExpenses = createAsyncThunk(
  "expense/get",
  async (id: number) => {
    return new Promise(async (resolve, reject) => {
      await getExpenses(id)
        .then((data: any) => resolve(data))
        .catch((data) => reject(data));
    });
  }
);

export const category = createAsyncThunk(
  "expense/category",
  async (id: number) => {
    return new Promise(async (resolve, reject) => {
      await expenseCategories(id)
        .then((data: any) => resolve(data))
        .catch((data) => reject(data));
    });
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState: INIT_STATE,
  reducers: {
    clearExpenseState: (state) => {
      state = INIT_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.pending, (state) => {})
      .addCase(addExpense.fulfilled, (state, action: any) => {})
      .addCase(addExpense.rejected, (state, action: any) => {})
      .addCase(fetchExpenses.pending, (state) => {
        state.expenses_loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action: any) => {
        state.expenses = [];
        state.total_spent = 0;
        action.payload.data.expenses.forEach((expense: any) => {
          state.expenses.push({
            id: expense[0],
            user_id: expense[1],
            title: expense[2],
            remarks: expense[3],
            category: expense[4],
            amount: expense[5],
          });
          state.total_spent = state.total_spent + expense[5];
          if (expense[5] > state.most_spent) {
            state.most_spent = expense[5];
          }
          state.expenses_loading = false;
        });
      })
      .addCase(fetchExpenses.rejected, (state, action: any) => {
        state.expenses_loading = false;
      })
      .addCase(category.pending, (state) => {
        state.categories_loading = true;
      })
      .addCase(category.fulfilled, (state, action: any) => {
        action.payload.data.expenses.forEach((category: any, idx: number) => {
          if (category[0] === state.category_spent[category[0]]["title"]) {
            state.category_spent[category[0]]["value"] = category[1];
          }
        });
        state.categories_loading = false;
      })
      .addCase(category.rejected, (state, action: any) => {
        state.categories_loading = false;
      });
  },
});

export const { clearExpenseState } = expenseSlice.actions;

export const selectExpenseState = ({ expense }: { expense: ExpenseState }) =>
  expense;

export default expenseSlice.reducer;
