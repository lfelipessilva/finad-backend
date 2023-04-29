export class CreateExpenseDto {
  value: number;
  description: string;
  date: Date;
  status: 'paid' | 'unpaid';
}
