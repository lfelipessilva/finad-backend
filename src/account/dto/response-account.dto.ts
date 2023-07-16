import { IsDate, IsString, Validate } from 'class-validator';
import { UserExistsRule } from '../validate/userExists.validate';
import { Account } from '@prisma/client';

export class ResponseAccountDTO {
  @IsString()
  @Validate(UserExistsRule)
  userId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<Account>) {
    Object.assign(this, partial);
  }
}
