import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
   name?: string;
   money?: number;
   income?: any[];
   spent?: any[];
   updated_at?: Date;
}
