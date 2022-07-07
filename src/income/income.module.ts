import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';

@Module({
  controllers: [IncomeController],
  providers: [IncomeService]
})
export class IncomeModule {}
