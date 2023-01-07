export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  money: number;
  income?: any[];
  expenses?: any[];
  created_at: Date;
  updated_at: Date;
};
  