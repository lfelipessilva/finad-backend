import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  ValidationPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseAccountDTO } from './dto/response-account.dto';
import { Account } from '@prisma/client';
import { randomUUID } from 'crypto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(new ValidationPipe()) createAccountDTO: CreateAccountDTO,
    @Request() req,
  ): Promise<ResponseAccountDTO> {
    try {
      const account: Account = {
        id: randomUUID(),
        userId: req.user.id,
        ...createAccountDTO,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      };

      const query = await this.accountService.create(account);

      return new ResponseAccountDTO(query);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.accountService.findAll({
      where: {
        userId: req.user.id,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
