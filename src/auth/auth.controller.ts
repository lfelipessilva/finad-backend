import { Controller, Post, UseGuards, Request, Response } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/')
  async login(@Request() req, @Response() res) {
    const { user, token } = await this.authService.login(req.user);
    const { refreshToken } = await this.authService.refresh(req.user);

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

  @UseGuards(LocalAuthGuard)
  @Post('/refresh')
  async refresh(@Request() req, @Response() res) {
    const { refreshToken } = await this.authService.refresh(req.user);

    const refreshTokenExpirationDate = new Date(
      new Date().setDate(new Date().getDate() + 30),
    ); // 30 days

    res.cookie('refreshToken', refreshToken, {
      expires: refreshTokenExpirationDate,
      sameSite: 'strict',
      httpOnly: true,
    });

    return res.send();
  }
}
