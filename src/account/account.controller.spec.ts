import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from '@prisma/client';
import { CreateAccountDTO } from './dto/create-account.dto';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { PrismaModule } from '../../prisma/prisma.module';

describe('AccountController', () => {
  let accountController: AccountController;
  let prismaService: PrismaService;
  let userService: UserService;

  beforeAll(() => {
    prismaService = new PrismaService();
    userService = new UserService(prismaService);

    prismaService.user.deleteMany();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    accountController = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(accountController).toBeDefined();
  });

  afterAll(() => {
    prismaService.user.deleteMany();
  });
});
