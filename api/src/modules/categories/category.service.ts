import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/primsa.service';

@Injectable()
export class CategoryService {


    constructor(private primsa: PrismaService) { }


    async createCategory(category: Prisma.CategoryCreateInput): Promise<Category> {
        return await this.primsa.category.create({
            data: category
        });
    }

    async getAllCategorys(userId): Promise<Category[]> {
        return await this.primsa.category.findMany(
            {
                where: { user: { id: userId } },
                include: { products: true }
            }
        );
    }

    async updateCategory(id: string, category: Prisma.CategoryUpdateInput): Promise<Category> {
        return await this.primsa.category.update({
            where: { id },
            data: category
        });
    }

    async deleteCategory(id: string): Promise<Category> {
        return await this.primsa.category.delete({
            where: { id }
        });
    }
}