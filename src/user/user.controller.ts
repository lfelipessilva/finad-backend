import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ResponseUserDTO } from './dto/response-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Body(new ValidationPipe()) userDTO: CreateUserDTO,
  ): Promise<ResponseUserDTO> {
    const user: User = {
      id: uuid(),
      email: userDTO.email,
      name: userDTO.name,
      password: userDTO.password,
      money: 0,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    };

    const query = await this.userService.create(user);

    return new ResponseUserDTO(query);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) userDTO: UpdateUserDTO,
  ): Promise<ResponseUserDTO> {
    const query = await this.userService.update(id, userDTO);

    return new ResponseUserDTO(query);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
