import { Injectable } from '@nestjs/common';
import { Product ,Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/primsa.service';

@Injectable()
export class ProductService {

    
    constructor(private primsa: PrismaService) { }

    
    async createProduct(product: Prisma.ProductCreateInput): Promise<Product> {
        return await this.primsa.product.create({
            data: product
        });
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.primsa.product.findMany({
            include: { supplier: true , category: true }
        });
    }

    async updateProduct(id: string, product: Prisma.ProductUpdateInput): Promise<Product> {
        return await this.primsa.product.update({
            where: { id },
            data: product
        });
    }

    async deleteProduct(id: string): Promise<Product> {
        return await this.primsa.product.delete({
            where: { id }
        });
    }
}