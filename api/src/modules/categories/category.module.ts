import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/primsa.service';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, PrismaService],
})
export class CategoryModule {}