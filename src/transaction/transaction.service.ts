import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(transaction: Transaction): Promise<Transaction> {
    try {
      return await this.prisma.transaction.create({
        data: transaction,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not create transaction',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(filters): Promise<Transaction[]> {
    try {
      return await this.prisma.transaction.findMany(filters);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find transactions',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string): Promise<Transaction | null> {
    try {
      return await this.prisma.transaction.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find transaction',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findFromUserById(userId: string, filters: any) {
    try {
      return this.prisma.transaction.findMany({
        where: {
          userId: userId,
          date: {
            gte: new Date(filters.dateStart),
            lte: new Date(filters.dateEnd),
          },
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              icon: true,
              type: true,
            },
          },
        },
        orderBy: {
          date: 'asc',
        },
        take: 20,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not find user transactions',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findBalance(userId: string, dateStart: Date, dateEnd: Date) {
    try {
      const query = await this.prisma.transaction.groupBy({
        by: ['type'],
        where: {
          userId: userId,
          date: {
            gte: new Date(dateStart),
            lte: new Date(dateEnd),
          },
        },
        _sum: {
          value: true,
        },
      });

      const expense = query?.[0]?.['_sum']?.value ?? 0;
      const income = query?.[1]?.['_sum']?.value ?? 0;

      return {
        expense,
        income,
        balance: (income ?? 0) - (expense ?? 0),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Could not find balance',
          displayMessage: 'Houve um problema ao achar valores nas transaçoes',
          detailedMessage: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    updateData: UpdateTransactionDto,
  ): Promise<Transaction> {
    try {
      return await this.prisma.transaction.update({
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
          error: 'Could not update transaction',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.transaction.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not delete transaction',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
