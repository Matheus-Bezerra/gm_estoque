import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {


    constructor(private prisma: PrismaService) { }


    async createProduct(userId: string, product: Prisma.ProductCreateInput): Promise<Product> {
        product.user = { connect: { id: userId } };
        return await this.prisma.product.create({
            data: product
        });
    }

    async getAllProducts(userId: string): Promise<Product[]> {
        return await this.prisma.product.findMany({
            where: { user: { id: userId } },
            include: { supplier: true, category: true }
        });
    }

    async updateProduct(id: string, product: Prisma.ProductUpdateInput): Promise<Product> {
        return await this.prisma.product.update({
            where: { id },
            data: product
        });
    }

    async deleteProduct(id: string): Promise<Product> {
        return await this.prisma.product.delete({
            where: { id }
        });
    }
}