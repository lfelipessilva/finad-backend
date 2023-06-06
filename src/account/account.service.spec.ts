import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { PrismaService } from 'prisma/prisma.service';
import { IncomeService } from 'src/income/income.service';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';

const userForTest: User = {
  id: randomUUID(),
  email: 'account@test.com',
  name: 'income',
  password: 'test',
  money: 1300,
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
};

const createAccountData = {
  id: randomUUID(),
  userId: userForTest.id,
  name: 'account name',
  description: 'descrição',
};

describe('AccountService', () => {
  let accountService: AccountService;
  let prismaService: PrismaService;
  let userService: UserService;

  let user = {} as User;
  beforeAll(async () => {
    prismaService = new PrismaService();
    accountService = new AccountService();
    userService = new UserService(prismaService);

    user = await userService.create(userForTest);
  });

  it('should be defined', () => {
    expect(accountService).toBeDefined();
  });

  it('should create an account', () => {
    const createdAccount = accountService.create({});
  });
});
