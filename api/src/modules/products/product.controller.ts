import { Body, Controller, Delete, Get, Param, Post, Put, Request, BadRequestException } from '@nestjs/common';
import { Prisma, TypeControl } from '@prisma/client';
import { ProductService } from './product.service';
import { ProductCreateInput, ProductGetAllInput } from './domain/products.interface';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getAllProducts(@Request() req, @Body() input?: ProductGetAllInput) {
        return await this.productService.getAllProducts(req.user.id, input);
    }

    @Post()
    async createProduct(@Request() req, @Body() product: ProductCreateInput) {
        this.validateProduct(product);
        return await this.productService.createProduct(req.user.id, product);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() updateProduct: Prisma.ProductUpdateInput) {
        this.validateProduct(updateProduct);
        return await this.productService.updateProduct(id, updateProduct);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return await this.productService.deleteProduct(id);
    }

    private validateProduct(product: Prisma.ProductCreateInput | Prisma.ProductUpdateInput) {
        if (product.typeControl === TypeControl.UNIT && (product.quantity == null || product.quantity as number < 0)) {
            throw new BadRequestException('Quantity is required when typeControl is UNIT');
        }
        if (product.typeControl === TypeControl.WEIGHT && (product.amount == null || product.amount as number < 0)) {
            throw new BadRequestException('Amount is required when typeControl is WEIGHT');
        }
    }
}