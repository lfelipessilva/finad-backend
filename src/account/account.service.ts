import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(account: Account) {
    try {
      const query = await this.prisma.account.create({
        data: account,
      });

      return query;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Could not create user',
          displayMessage: 'Houve um problema ao criar usuário',
          detailedMessage: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
