import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('validateUser', username);
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    delete user.password;
    const payload = { user, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getTokenData(token: string) {
    return this.jwtService.decode(token);
  }
}
