import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { Income } from '@prisma/client';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) { }

  async create(income: Income): Promise<Income> {
    try {
      return await this.prisma.income.create({
        data: income,
      });
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

  async findAll(): Promise<Income[]> {
    try {
      return await this.prisma.income.findMany();
    } catch (error) {
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
          userId: userId
        }
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
          id: id
        }
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
