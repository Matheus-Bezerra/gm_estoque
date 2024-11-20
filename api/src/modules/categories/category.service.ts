import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {


    constructor(private prisma: PrismaService) { }


    async createCategory(userId: string, category: Prisma.CategoryCreateInput): Promise<Category> {
        category.user = { connect: { id: userId } };
        return await this.prisma.category.create({
            data: category
        });
    }

    async getAllCategorys(userId): Promise<Category[]> {
        return await this.prisma.category.findMany(
            {
                where: { user: { id: userId } },
                include: { products: true }
            }
        );
    }

    async updateCategory(id: string, category: Prisma.CategoryUpdateInput): Promise<Category> {
        return await this.prisma.category.update({
            where: { id },
            data: category
        });
    }

    async deleteCategory(id: string): Promise<Category> {
        return await this.prisma.category.delete({
            where: { id }
        });
    }
}