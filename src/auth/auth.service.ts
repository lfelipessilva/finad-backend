import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../types/User';

//automatically authenticates user with passport-js
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      if (await bcrypt.compare(pass, user.password)) {
        return user;
      }
      return null;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
