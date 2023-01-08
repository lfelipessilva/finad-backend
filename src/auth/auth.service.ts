import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../types/User';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    if (await bcrypt.compare(pass, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15min',
    });

    return {
      user,
      token,
    };
  }

  async refresh(user: any) {
    const payload = {
      email: user.email,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });

    return {
      refreshToken,
    };
  }
}
