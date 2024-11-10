import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/product.module';
import { PrismaService } from './modules/prisma/primsa.service';
import { SupplierModule } from './modules/suppliers/supplier.module';

@Module({
  imports: [ProductModule, SupplierModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
