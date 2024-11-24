import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierService } from '../suppliers/supplier.service';
import { CategoryService } from '../categories/category.service';

@Module({
    controllers: [ProductController],
    providers: [ProductService, PrismaService, SupplierService, CategoryService],
})
export class ProductModule {}