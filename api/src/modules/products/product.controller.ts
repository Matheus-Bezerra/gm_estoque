import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts(@Param("user_id") userId: string) {
        return await this.productService.getAllProducts(userId);
    }

    @Post()
    async createProduct(@Body() product: Prisma.ProductCreateInput) {
        return await this.productService.createProduct(product);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() updateProduct: Prisma.ProductUpdateInput) {
        return await this.productService.updateProduct(id, updateProduct);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return await this.productService.deleteProduct(id);
    }
}