import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Expense } from '@prisma/client';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(expense: Expense) {
    try {
      const createExpense = this.prisma.expense.create({
        data: expense,
      });

      const createTransaction = this.prisma.transaction.create({
        data: {
          id: expense.id,
          userId: expense.userId,
          status: expense.status,
          type: 'expense',
          value: expense.value,
          date: expense.date,
          created_at: expense.created_at,
          updated_at: expense.updated_at,
        },
      });

      await this.prisma.$transaction([createExpense, createTransaction]);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not create expense',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(filters): Promise<Expense[]> {
    try {
      return await this.prisma.expense.findMany(filters);
    } catch (error) {
      console.log(error);
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
