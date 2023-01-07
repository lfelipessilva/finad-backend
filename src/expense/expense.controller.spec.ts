import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('ExpenseController', () => {
  let controller: ExpenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [ExpenseController],
      providers: [ExpenseService],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
