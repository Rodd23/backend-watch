import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(page: number = 1, pageSize: number = 8) {
    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
      throw new BadRequestException('Invalid page number or page size');
    }
  
    const totalCount = await this.prisma.user.count();
    const totalPages = Math.ceil(totalCount / pageSize);

    if (page > totalPages) {
      throw new NotFoundException('Page not found');
    }

    const users = await this.prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        email: true,
        name: true,
      }
    });

    return {
      users,
      currentPage: page,
      totalPages,
      totalUsers: totalCount,
    }
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...rest } = updateUserDto;

    let data: UpdateUserDto = { ...rest };

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

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: `User with id ${id} has been successfully removed`,
    };
  }
}
