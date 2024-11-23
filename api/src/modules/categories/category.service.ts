import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryCreateInput, CategoryUpdateInput } from './domain/category.interface';

@Injectable()
export class CategoryService {


    constructor(private prisma: PrismaService) { }


    async createCategory(userId: string, category: CategoryCreateInput): Promise<Category> {

        let categoryCreated: Prisma.CategoryCreateArgs = {
            data: {
                name: category.name,
                color: category.color,
                user: { connect: { id: userId } }
            }, include: { products: true }
        }

        if (category.productsIds && category.productsIds.length > 0)
            categoryCreated.data.products = { connect: category.productsIds.map(id => ({ id })) };

        return await this.prisma.category.create(categoryCreated);
    }

    async getAllCategorys(userId): Promise<Category[]> {
        return await this.prisma.category.findMany(
            {
                where: { user: { id: userId } },
                include: { products: true },
                orderBy: { name: 'asc' }
            }
        );
    }

    async updateCategory(id: string, category: CategoryUpdateInput): Promise<Category> {

        const productsDisassociateCategories = [];

        const categoryData = await this.prisma.category.findUnique({ where: { id }, include: { products: true } });

        categoryData.products.forEach(product => {
            if (!category.productsIds.includes(product.id)) {
                productsDisassociateCategories.push({ id: product.id });
            }
        });

        const productsAssociateCategories = category.productsIds.filter(id => !categoryData.products.map(product => product.id).includes(id));

        category.products = { connect: productsAssociateCategories.map(id => ({ id })) };


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