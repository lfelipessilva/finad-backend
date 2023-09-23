import { ApiProperty } from '@nestjs/swagger';

export class CreateIncomeDto {
  @ApiProperty()
  value: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  status: 'received' | 'unreceived';

  @ApiProperty()
  categoryId: string | null;

  @ApiProperty()
  accountId: string;
}
