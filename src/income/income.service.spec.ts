import { IncomeService } from './income.service';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../types/User';
import { v4 as uuid } from 'uuid';
import { Income, Transaction } from '@prisma/client';

const testingIncome: Income = {
  id: uuid(),
  userId: '',
  value: 120,
  status: 'received',
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
  date: new Date('December 14, 2004 03:24:00'),
  categoryId: null
};

const testingTransaction: Transaction = {
  ...testingIncome,
  type: 'income',
  description: 'desc',
};

const userForTest = {
  id: uuid(),
  email: 'income@test.com',
  name: 'income',
  password: 'test',
  money: 1300,
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
} as User;

describe('IncomeService', () => {
  let incomeService: IncomeService;
  let prismaService: PrismaService;
  let userService: UserService;

  let user = {} as User;
  beforeAll(async () => {
    prismaService = new PrismaService();
    incomeService = new IncomeService(prismaService);
    userService = new UserService(prismaService);

    user = await userService.create(userForTest);
    testingIncome.userId = user.id;
  });

  it('should be defined', () => {
    expect(incomeService).toBeDefined();
  });

  it('should create an income', async () => {
    const createdIncome = await incomeService.create(testingIncome, testingTransaction);
    expect(createdIncome.value).toEqual(testingIncome.value);
    expect(createdIncome.id).toBeTruthy();
  });

  it('should return an array of incomes', async () => {
    const incomes = await incomeService.findAll({});
    expect(incomes).toEqual(expect.arrayContaining([testingIncome]));
  });

  it('should find one income', async () => {
    const foundIncome = await incomeService.findOne(testingIncome.id);

    expect(foundIncome?.value).toBeTruthy();
  });

  it('should update an income', async () => {
    const incomeId = testingIncome.id;
    const incomeDataToUpdate = {
      value: 240,
      date: new Date('July 25, 2001 08:24:00'),
    };
    const updatedIncome = await incomeService.update(
      incomeId,
      incomeDataToUpdate,
    );

    expect(updatedIncome.date).not.toEqual(testingIncome.date);
    expect(updatedIncome.value).toEqual(240);
  });

  it('should not find one income', async () => {
    const foundIncome = await userService.findOne('14');

    expect(foundIncome).toBeFalsy();
  });

  it('should delete one income', async () => {
    const incomeId = testingIncome.id;
    const deletedIncome = await incomeService.remove(incomeId);

    expect(deletedIncome.id).toBe(incomeId);
  });

  afterAll(async () => {
    await prismaService.income.deleteMany();
  });
});
