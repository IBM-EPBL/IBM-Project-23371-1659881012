export interface ExpenseType {
  id?: number;
  user_id: number;
  title: string;
  remarks: string;
  category: string;
  amount: number;
}
