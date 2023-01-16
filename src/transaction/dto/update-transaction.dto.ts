import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  value?: number;
  status?: string;
  description?: string;
  categoryId?: string;
  date?: Date;
  updated_at?: Date;
}
