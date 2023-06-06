import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty()
  value: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  status: 'paid' | 'unpaid';
  @ApiProperty()
  categoryId: string | null;
}
