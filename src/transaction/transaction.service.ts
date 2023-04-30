import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Transaction, Expense, Prisma } from '@prisma/client';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) { }

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

  async findFromUserById(userId: string) {
    try {
      return this.prisma.$queryRaw`
        SELECT Transaction.*, Expense.description 
        FROM Transaction        
        JOIN Expense
          ON Transaction.id = Expense.id
        WHERE Transaction.userId = ${userId}

        UNION ALL
        
        SELECT Transaction.*, Income.description 
        FROM Transaction  
        JOIN Income
          ON Transaction.id = Income.id
        WHERE Transaction.userId = ${userId}

        ORDER BY date ASC
        `;
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
