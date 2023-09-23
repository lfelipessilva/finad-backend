import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDTO } from './create-account.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAccountDto extends PartialType(CreateAccountDTO) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}
