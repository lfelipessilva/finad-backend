import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  type: string;
  @ApiProperty()
  name: string;
}
