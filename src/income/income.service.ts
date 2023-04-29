import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Income } from '@prisma/client';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) {}

  async create(income: Income) {
    try {
      const createIncome = this.prisma.income.create({
        data: income,
      });

      const createTransaction = this.prisma.transaction.create({
        data: {
          id: income.id,
          userId: income.userId,
          status: income.status,
          type: 'income',
          value: income.value,
          date: income.date,
          created_at: income.created_at,
          updated_at: income.updated_at,
        },
      });

      await this.prisma.$transaction([createIncome, createTransaction]);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not create income',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(filters): Promise<Income[]> {
    try {
      return await this.prisma.income.findMany(filters);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find incomes',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string): Promise<Income | null> {
    try {
      return await this.prisma.income.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find income',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findFromUserById(userId: string) {
    try {
      return await this.prisma.income.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not find user incomes',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateData: UpdateIncomeDto): Promise<Income> {
    try {
      return await this.prisma.income.update({
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
          error: 'Could not update income',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.income.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not delete income',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
