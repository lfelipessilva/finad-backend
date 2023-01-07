import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    try {
      const hashedPass = await bcrypt.hash(user.password, 12);
      user.password = hashedPass;

      return await this.prisma.user.create({
        data: user,
      });
    } catch (error) {
      console.error(error);
      return error
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not create user',
          displayMessage: 'Houve um problema ao criar usuário',
          detailedMessage: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find users',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          incomes: {
            take: 20,
          },
          expenses: {
            take: 20,
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find user',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find user',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...updateData,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not update user',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not delete user',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
