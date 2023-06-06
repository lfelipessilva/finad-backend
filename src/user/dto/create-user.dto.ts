import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsNumber()
  @ApiProperty()
  money: number;
}
