import { ExpenseService } from './expense.service';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../types/User';
import { v4 as uuid } from 'uuid';
import { Expense, Transaction } from '@prisma/client';

const testingExpense: Expense = {
  id: uuid(),
  userId: '',
  value: 120,
  date: new Date('December 14, 2004 03:24:00'),
  status: 'received',
  categoryId: null,
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
};

const testingTransaction: Transaction = {
  ...testingExpense,
  description: 'test expense',
  type: 'expense',
  status: 'paid',
};

const userForTest = {
  id: uuid(),
  email: 'expense@test.com',
  name: 'expense',
  password: 'test',
  money: 1300,
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
} as User;

describe('ExpenseService', () => {
  let expenseService: ExpenseService;
  let prismaService: PrismaService;
  let userService: UserService;

  let user = {} as User;
  beforeAll(async () => {
    prismaService = new PrismaService();
    expenseService = new ExpenseService(prismaService);
    userService = new UserService(prismaService);

    user = await userService.create(userForTest);
    testingExpense.userId = user.id;
  });

  it('should be defined', () => {
    expect(expenseService).toBeDefined();
  });

  it('should create an expense', async () => {
    const createdExpense = await expenseService.create(
      testingExpense,
      testingTransaction,
    );
    expect(createdExpense.value).toEqual(testingExpense.value);

    expect(createdExpense.id).toBeTruthy();
  });

  it('should return an array of expenses', async () => {
    const expenses = await expenseService.findAll({});
    expect(expenses).toEqual(expect.arrayContaining([testingExpense]));
  });

  it('should find one expense', async () => {
    const foundExpense = await expenseService.findOne(testingExpense.id);

    expect(foundExpense?.value).toBeTruthy();
  });

  it('should update an expense', async () => {
    const expenseId = testingExpense.id;
    const expenseDataToUpdate = {
      value: 240,
      date: new Date('July 25, 2001 08:24:00'),
    };
    const updatedExpense = await expenseService.update(
      expenseId,
      expenseDataToUpdate,
    );

    expect(updatedExpense.date).not.toEqual(testingExpense.date);
    expect(updatedExpense.value).toEqual(240);
  });

  it('should not find one expense', async () => {
    const foundExpense = await userService.findOne('14');

    expect(foundExpense).toBeFalsy();
  });

  it('should delete one expense', async () => {
    const expenseId = testingExpense.id;
    const deletedExpense = await expenseService.remove(expenseId);

    expect(deletedExpense.id).toBe(expenseId);
  });

  afterAll(async () => {
    await prismaService.expense.deleteMany();
  });
});
