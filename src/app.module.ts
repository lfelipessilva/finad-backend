import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    UserModule,
    IncomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
