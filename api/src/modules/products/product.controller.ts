import { Body, Controller, Delete, Get, Param, Post, Put, Request, BadRequestException, Query } from '@nestjs/common';
import { Prisma, TypeControl } from '@prisma/client';
import { ProductService } from './product.service';
import { ProductCreateInput, ProductGetAllInput } from './domain/products.interface';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getAllProducts(@Request() req, @Query() input?: ProductGetAllInput) {
        return await this.productService.getAllProducts(req.user.id, input);
    }

    @Post()
    async createProduct(@Request() req, @Body() product: ProductCreateInput) {
        await this.productService.validateProduct(product);
        return await this.productService.createProduct(req.user.id, product);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() updateProduct: Prisma.ProductUpdateInput) {
        await this.productService.validateProduct(updateProduct);
        return await this.productService.updateProduct(id, updateProduct);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return await this.productService.deleteProduct(id);
    }

}