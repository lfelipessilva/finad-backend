import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  money?: number;
}
