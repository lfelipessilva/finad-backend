import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../types/User';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Request() req) {
    console.log(req.body)

    return { john: 'doe', ...req.route}
    // return requestUser
    // const user = {
    //   id: uuid(),
    //   email: requestUser.email,
    //   name: requestUser.name,
    //   password: requestUser.password,
    //   money: 0,
    //   created_at: new Date(Date.now()),
    //   updated_at: new Date(Date.now()),
    // } as User;

    // return user
    // return this.userService.create(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth')
  login(@Request() req) {
    return this.authService.login(req.user);
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
