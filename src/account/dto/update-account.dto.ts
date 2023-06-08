import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDTO } from './create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDTO) {
  name: String;
  description: String;
}
