import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(category: Category) {
    try {
      return this.prisma.category.create({
        data: category,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not create category',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(filters): Promise<Category[]> {
    try {
      return this.prisma.category.findMany(filters);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find categorys',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string): Promise<Category | null> {
    try {
      return this.prisma.category.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find category',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, updateData: UpdateCategoryDto): Promise<Category> {
    try {
      return this.prisma.category.update({
        where: {
          id: id,
        },
        data: {
          ...updateData,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not update category',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.category.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not delete category',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
