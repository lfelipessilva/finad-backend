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
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { v4 as uuid } from 'uuid';
import { Transaction } from '../types/Transaction';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() transactionRequest: CreateTransactionDto, @Request() req) {
    const transaction = {
      id: uuid(),
      userId: req.user.id,
      type: transactionRequest.type,
      description: transactionRequest.description,
      value: transactionRequest.value,
      status: transactionRequest.status,
      categoryId: transactionRequest.categoryId ?? null,
      date: new Date(transactionRequest.date),
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    } as Transaction;

    return this.transactionService.create(transaction);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const filters = req.query;
    return this.transactionService.findFromUserById(req.user.id, filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get('balance')
  findBalance(@Request() req) {
    const userId = req.user.id;
    const dateStart = req.query.dateStart;
    const dateEnd = req.query.dateEnd;

    return this.transactionService.findBalance(userId, dateStart, dateEnd);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
