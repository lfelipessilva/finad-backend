import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IncomeController],
  providers: [IncomeService],
  exports: [IncomeService],
})
export class IncomeModule {}
