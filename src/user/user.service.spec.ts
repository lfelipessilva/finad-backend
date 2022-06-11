import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { AuthService } from '../auth/auth.service';

const testingUser = {
  id: uuid(),
  email: 'user@example.com',
  name: 'example',
  password: 'test',
  money: 1300,
  created_at: new Date(Date.now()),
  updated_at: new Date(Date.now()),
};

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let authService: AuthService;
  let jwtService: JwtService

  beforeEach(async () => {
    jwtService = new JwtService()
    prismaService = new PrismaService();
    userService = new UserService(prismaService);
    authService = new AuthService(userService, jwtService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create an user', async () => {
    const createdUser = await userService.create(testingUser);
    expect(testingUser.email).toEqual(createdUser.email);
    expect(createdUser.id).toBeTruthy();
  });

  it('should return an array of users', async () => {
    const users = await userService.findAll();
    expect(users).toEqual(expect.arrayContaining([testingUser]));
  });

  it('should find one user', async () => {
    const foundUser = await userService.findOne(testingUser.id);

    expect(foundUser?.name).toBeTruthy();
  });

  it('should update an user', async () => {
    const userId = testingUser.id;
    const userDataToUpdate = {
      email: 'update@example.com',
      name: 'update',
      money: 1600,
    };
    const user = await userService.update(userId, userDataToUpdate);

    expect(user.name).toEqual('update');
    expect(user.email).toEqual('update@example.com');
    expect(user.money).toEqual(1600);
  });

  it('should not find one user', async () => {
    const foundUser = await userService.findOne('14');

    expect(foundUser).toBeFalsy();
  });

  it('should delete one user', async () => {
    const userId = testingUser.id;
    const deletedUser = await userService.remove(userId);

    expect(deletedUser.id).toBe(userId);
  });

  afterAll(async () => {
    await prismaService.user.deleteMany();
  });
});
