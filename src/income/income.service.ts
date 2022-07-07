import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Injectable()
export class IncomeService {
  create(createIncomeDto: CreateIncomeDto) {
    return 'This action adds a new income';
  }

  findAll() {
    return `This action returns all income`;
  }

  findOne(id: string) {
    return `This action returns a #${id} income`;
  }

  update(id: string, updateIncomeDto: UpdateIncomeDto) {
    return `This action updates a #${id} income`;
  }

  remove(id: string) {
    return `This action removes a #${id} income`;
  }
}
