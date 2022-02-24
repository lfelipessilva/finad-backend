export class CreateUserDto {
  id: string;
  email: string;
  name: string;
  money: string;
  income: any[];
  spent: any[];
  created_at: Date;
  upated_at: Date;
}
