import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

class CreateUserDto {
  name: string;
  email: string;
  password: string;
}
@Injectable()
export class UsersService {
  constructor(private readonly service: PrismaService) {}

  async findOne(id: number) {
    return this.service.user.findUnique({
      where: { id },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.service.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
  }

  async findByEmail(email: string) {
    return this.service.user.findUnique({
      where: { email },
    });
  }
}
