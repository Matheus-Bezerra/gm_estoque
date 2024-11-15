import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    getAllCategorys(@Param("user_id") userId: string) {
        return this.categoryService.getAllCategorys(userId);
    }

    @Post()
    createCategory(@Body() category: Prisma.CategoryCreateInput) {
        return this.categoryService.createCategory(category);
    }

    @Put(':id')
    updateCategory(@Param('id') id: string, @Body() updateCategory: Prisma.CategoryUpdateInput) {
        return this.categoryService.updateCategory(id, updateCategory);
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return this.categoryService.deleteCategory(id);
    }
}