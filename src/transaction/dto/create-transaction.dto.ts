export class CreateTransactionDto {
  status: 'paid' | 'unpaid';
  type: 'income' | 'expense';
  description: string;
  categoryId?: string;
  value: number;
  date: Date;
}
