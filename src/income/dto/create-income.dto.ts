export class CreateIncomeDto {
  value: number;
  description: string;
  date: Date;
  status: 'received' | 'unreceived';
}
