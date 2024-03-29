export type Transaction = {
  id: string;
  userId: string;
  status: string;
  type: string;
  description: string;
  categoryId: string | null;
  value: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
};
