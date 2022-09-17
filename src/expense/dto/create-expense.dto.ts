export class CreateExpenseDto {
  id: string;
  userId: string;
  value: number;
  description: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
}
