export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  money: number;
  income?: any[];
  expense?: any[];
  created_at: Date;
  updated_at: Date;
};
  