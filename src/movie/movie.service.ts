import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    const data = { ...createMovieDto };

    const createdMovie = await this.prisma.movie.create({ data });

    return {
      ...createdMovie
    }
  }

  async findAll(page: number = 1, pageSize: number = 8) {
    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
      throw new BadRequestException('Invalid page number or page size');
    }

    const totalCount = await this.prisma.movie.count();

    const totalPages = Math.ceil(totalCount / pageSize);

    if (page > totalPages) {
      throw new NotFoundException('Page not found');
    }

    const movies = await this.prisma.movie.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      movies,
      currentPage: page, 
      totalPages,
      totalMovies: totalCount,
    }
  }

  async findOne(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return {
      movie
    }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const data = { ...updateMovieDto };

    const updatedMovie = await this.prisma.movie.update({
      where: { id },
      data,
    });

    return {
      updatedMovie
    }
  }

  async remove(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    await this.prisma.movie.delete({
      where: { id },
    });

    return {
      message: `Movie with id ${id} has been successfully removed`,
    }
  }
}
