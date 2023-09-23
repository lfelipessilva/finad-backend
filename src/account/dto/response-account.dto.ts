import { IsDate, IsString, Validate } from 'class-validator';
import { UserExistsRule } from '../validate/userExists.validate';
import { Account } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseAccountDTO {
  @Validate(UserExistsRule)
  @ApiProperty()
  userId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<Account>) {
    Object.assign(this, partial);
  }
}
