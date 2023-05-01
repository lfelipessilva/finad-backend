export type Expense = {
  id: string;
  userId: string;
  value: number;
  status: string;
  date: Date;
  categoryId: string | null;
  created_at: Date;
  updated_at: Date;
};
