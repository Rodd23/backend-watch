import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if(!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
      ...user,
      password: undefined,
    }
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    const { password, ...rest } = updateUserDto;

    let data: any = { ...rest };

    if (password) {
      data = {
        ...data,
        password: await bcrypt.hash(password, 10),
      };
    };

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      ...updatedUser,
      password: undefined,
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
