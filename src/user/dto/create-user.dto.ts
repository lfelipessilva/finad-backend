export class CreateUserDto {
  id: string;
  email: string;
  name: string;
  money: number;
  income: any[];
  spent: any[];
  created_at: Date;
  updated_at: Date;
}
