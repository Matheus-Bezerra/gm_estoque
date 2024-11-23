import { BadRequestException, Injectable } from '@nestjs/common';
import { Product, Prisma, TypeControl, Category } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProductCreateInput, ProductGetAllInput, ProductUpdateInput } from './domain/products.interface';

@Injectable()
export class ProductService {


    constructor(private prisma: PrismaService) { }


    async createProduct(userId: string, product: ProductCreateInput): Promise<Product> {
           
        let productCreate: Prisma.ProductCreateArgs = {
            data: {
                name: product.name,
                typeControl: product.typeControl,
                quantity: product.quantity,
                amount: product.amount,
                user: { connect: { id: userId } }
            }, include: { supplier: true, category: true }
        }

        if(product.supplierId) {
            productCreate.data.supplier = { connect: { id: product.supplierId } }
        }

        if(product.categoryId) {
            productCreate.data.category = { connect: { id: product.categoryId } }
        }

        return await this.prisma.product.create(productCreate);
    }

    async getAllProducts(userId: string, input?: ProductGetAllInput): Promise<Product[]> {

        const args: Prisma.ProductFindManyArgs = {
            where: { user: { id: userId } },
            include: { supplier: true, category: true },
            orderBy: { updateAt: 'desc' }
        }

        if(input?.productsWithoutSupplier) {
            args.where = { ...args.where, supplierId: null }
        }

        if(input?.productsWithoutCategory) {
            args.where = { ...args.where, categoryId: null }
        }

        return await this.prisma.product.findMany(args);
    }

    async updateProduct(id: string, product: ProductUpdateInput): Promise<Product> {
        
        let data: Prisma.ProductUpdateInput = {};

        const updateField = (field: keyof ProductUpdateInput, value: any) => {
            if (value !== undefined) {
                data[field] = value;
            }
        };

        updateField('name', product.name);
        updateField('typeControl', product.typeControl);
        updateField('quantity', product.quantity);
        updateField('amount', product.amount);

        if (product.typeControl || product.supplierId || product.categoryId) {

            const productItem = await this.prisma.product.findUnique({ where: { id } });

            if(product.typeControl !== productItem.typeControl)
                if (product.typeControl === TypeControl.UNIT) {
                    data.amount = null;
                } else if (product.typeControl === TypeControl.WEIGHT) {
                    data.quantity = null;
                }

            if (product?.supplierId) {
                data.supplier = { disconnect: { id: productItem.supplierId },connect: { id: product.supplierId } };
            }

            if (product?.categoryId) {
                data.category = { disconnect: { id: productItem.categoryId }, connect: { id: product.categoryId } };
            }
    
        }

        return await this.prisma.product.update({
            where: { id },
            data,
            include: { supplier: true, category: true },
        });
    }

    async deleteProduct(id: string): Promise<Product> {
        return await this.prisma.product.delete({
            where: { id }
        });
    }

    async validateProduct(product: Prisma.ProductCreateInput | Prisma.ProductUpdateInput) {

        if (product.typeControl == TypeControl.UNIT && (product.quantity == null || product.quantity as number < 0)) {
            throw new BadRequestException('Quantity is required when typeControl is UNIT');
        }
        if (product.typeControl == TypeControl.WEIGHT && (product.amount == null || product.amount as number < 0)) {
            throw new BadRequestException('Amount is required when typeControl is WEIGHT');
        }

    }

}