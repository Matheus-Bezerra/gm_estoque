import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/product.module';
import { PrismaService } from './modules/prisma/primsa.service';
import { SupplierModule } from './modules/suppliers/supplier.module';
import { CategoryModule } from './modules/categories/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { SetMetadata } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Module({
  imports: [ProductModule, SupplierModule, CategoryModule, AuthModule, UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
