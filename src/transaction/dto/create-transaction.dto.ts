export class CreateTransactionDto {
  status: string;
  type: string;
  description: string;
  categoryId?: string;
  value: number;
  date: Date;
}
