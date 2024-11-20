import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts(@Request() req) {
        return await this.productService.getAllProducts(req.user.id);
    }

    @Post()
    async createProduct(@Request() req, @Body() product: Prisma.ProductCreateInput) {
        return await this.productService.createProduct(req.user.id,product);
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