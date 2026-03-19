import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayLoadType } from './type/payLoadType';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(name: string, email: string, password: string): Promise<any> {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.usersService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const payload: PayLoadType = { sub: newUser.id, username: newUser.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
