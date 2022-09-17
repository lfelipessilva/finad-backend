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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { v4 as uuid } from 'uuid';
import { Income } from '../types/Income';
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
      description: incomeRequest.description,
      value: incomeRequest.value,
      date: incomeRequest.date,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    } as Income;

    return this.incomeService.create(income);
  }

  @Get()
  findAll() {
    return this.incomeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.incomeService.update(id, updateIncomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomeService.remove(id);
  }
}
