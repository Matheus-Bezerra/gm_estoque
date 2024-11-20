import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    getAllCategorys(@Request() req) {
        return this.categoryService.getAllCategorys(req.user.id);
    }

    @Post()
    createCategory(@Request() req, @Body() category: Prisma.CategoryCreateInput) {
        return this.categoryService.createCategory(req.user.id, category);
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