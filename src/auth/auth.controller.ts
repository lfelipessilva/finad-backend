import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/')
  async login(@Request() req, @Response() res) {
    const { user, token, refreshToken } = await this.authService.login(
      req.user,
    );

    const ExpirationDate = new Date(new Date().getTime() + 60 * 1000 * 15); // 15 minutes
    const refreshTokenExpirationDate = new Date(
      new Date().setDate(new Date().getDate() + 30),
    ); // 30 days

    res.cookie('refreshToken', refreshToken, {
      expires: refreshTokenExpirationDate,
      sameSite: 'strict',
      httpOnly: true,
    });

    res.cookie('accessToken', token, {
      expires: ExpirationDate,
      sameSite: 'strict',
      httpOnly: true,
    });

    return res.send(user);
  }

  @UseGuards(RefreshAuthGuard)
  @Get('/refresh-token')
  async refresh(@Request() req, @Response() res) {
    const { accessToken } = await this.authService.refresh(req.user);

    const ExpirationDate = new Date(new Date().getTime() + 60 * 1000 * 15); // 15 minutes

    res.cookie('accessToken', accessToken, {
      expires: ExpirationDate,
      sameSite: 'strict',
      httpOnly: true,
    });

    return res.send();
  }

  @Post('/logout')
  async logout(@Request() req, @Response() res) {
    res.cookie('accessToken', '');
    res.cookie('refreshToken', '');
    return res.send();
  }
}
