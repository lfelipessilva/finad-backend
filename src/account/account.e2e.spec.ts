import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
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
import { AuthModule } from '../auth/auth.module';

describe('AccountController', () => {
  let accountController: AccountController;
  let prismaService: PrismaService;
  let userService: UserService;
  let app: INestApplication;

  beforeAll(() => {
    prismaService = new PrismaService();
    userService = new UserService(prismaService);

    prismaService.user.deleteMany()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, AuthModule],
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    accountController = module.get<AccountController>(AccountController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(accountController).toBeDefined();
  });

  it('should not create account with undefined user', async () => {
    const account: CreateAccountDTO = {
      userId: 'no user',
      name: 'test',
      description: 'for testing purposes',
    }

    const response = await supertest(app.getHttpServer())
      .post('/account')
      .expect(401)

    expect(response.status).toBe(401)
  })

  it('should create an account', async () => {
    const user = await userService.create({
      id: randomUUID(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      money: 0,
      password: faker.internet.password(),
      created_at: new Date(),
      updated_at: new Date(),
    })

    const account: CreateAccountDTO = {
      userId: user.id,
      name: 'test',
      description: 'for testing purposes',
    }

    return supertest(app.getHttpServer())
      .post('/account')
      .expect(200)
      .send(account)
  });

  afterAll(() => {
    prismaService.user.deleteMany()
  })
});
