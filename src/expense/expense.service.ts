import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Expense } from '@prisma/client';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(expense: Expense): Promise<Expense> {
    try {
      return await this.prisma.expense.create({
        data: expense,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not create expense',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Expense[]> {
    try {
      return await this.prisma.expense.findMany();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find expenses',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string): Promise<Expense | null> {
    try {
      return await this.prisma.expense.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find expense',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findFromUserById(userId: string) {
    try {
      return await this.prisma.expense.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not find user expenses',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateData: UpdateExpenseDto): Promise<Expense> {
    try {
      return await this.prisma.expense.update({
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
          error: 'Could not update expense',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.expense.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not delete expense',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
