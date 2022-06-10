import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

const userArray = [
  {
    id: uuid(),
    email: 'user1@example.com',
    name: 'example1',
    money: '4500',
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
  },
  {
    id: uuid(),
    email: 'user2@example.com',
    name: 'example2',
    money: '9400',
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
  },
  {
    id: uuid(),
    email: 'user3@example.com',
    name: 'example3',
    money: '1300',
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
  },
];

const oneUser = userArray[0];

const db = {
  user: { 
    create: jest.fn().mockReturnValue(oneUser),
    update: jest.fn().mockResolvedValue(oneUser),
    findFirst: jest.fn().mockResolvedValue(oneUser),
    findUnique: jest.fn().mockResolvedValue(oneUser),
    findMany: jest.fn().mockResolvedValue(userArray),
    save: jest.fn(),
    delete: jest.fn().mockResolvedValue(oneUser),
  },
};

describe('UserService', () => { 
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });

    it('should update an user', async () => {
      const user = await service.update('aijdflasjdf', oneUser)
    })
  });
});
