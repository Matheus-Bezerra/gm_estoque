import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/categories/category.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { ProductModule } from './modules/products/product.module';
import { SupplierModule } from './modules/suppliers/supplier.module';
import { UserModule } from './modules/user/user.module';



@Module({
  imports: [ProductModule, SupplierModule, CategoryModule, UserModule, AuthModule],
  controllers: [],
  providers: [
    PrismaService
  ],
})
export class AppModule { }
