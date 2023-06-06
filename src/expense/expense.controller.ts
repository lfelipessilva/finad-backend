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
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { v4 as uuid } from 'uuid';
import { Expense } from '../types/Expense';
import { Transaction } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  findFromUser(@Request() req) {
    return this.expenseService.findFromUserById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() expenseRequest: CreateExpenseDto, @Request() req) {
    const expense = {
      id: uuid(),
      userId: req.user.id,
      value: expenseRequest.value,
      status: expenseRequest.status,
      date: new Date(expenseRequest.date),
      categoryId: expenseRequest.categoryId,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    } as Expense;

    const transaction = {
      ...expense,
      type: 'expense',
      description: expenseRequest.description,
    } as Transaction;

    return this.expenseService.create(expense, transaction);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.expenseService.findAll({
      where: {
        userId: req.user.id,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }
}
