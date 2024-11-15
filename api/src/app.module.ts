import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/product.module';
import { PrismaService } from './modules/prisma/primsa.service';
import { SupplierModule } from './modules/suppliers/supplier.module';
import { CategoryModule } from './modules/categories/category.module';

@Module({
  imports: [ProductModule, SupplierModule, CategoryModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
