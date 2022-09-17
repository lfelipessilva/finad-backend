import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService]
})
export class ExpenseModule {}
