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
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { v4 as uuid } from 'uuid';
import { Income } from '../types/Income';
import { Transaction } from '@prisma/client';
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  findFromUser(@Request() req) {
    return this.incomeService.findFromUserById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() incomeRequest: CreateIncomeDto, @Request() req) {
    const income = {
      id: uuid(),
      userId: req.user.id,
      value: incomeRequest.value,
      status: incomeRequest.status,
      date: new Date(incomeRequest.date),
      categoryId: incomeRequest.categoryId,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    } as Income;

    const transaction = {
      ...income,
      type: 'income',
      description: incomeRequest.description,
    } as Transaction;

    return this.incomeService.create(income, transaction);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.incomeService.findAll({
      where: {
        userId: req.user.id,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.incomeService.update(id, updateIncomeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomeService.remove(id);
  }
}
