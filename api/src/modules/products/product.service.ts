import { BadRequestException, Injectable } from '@nestjs/common';
import { Product, Prisma, TypeControl, Category } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProductCreateInput, ProductGetAllInput, ProductUpdateInput } from './domain/products.interface';
import { SupplierService } from '../suppliers/supplier.service';
import { CategoryService } from '../categories/category.service';

@Injectable()
export class ProductService {


    constructor(private prisma: PrismaService, private supplierService: SupplierService, private categoryService: CategoryService) { }


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

    async getProductById(id: string): Promise<Product> {
        return await this.prisma.product.findUnique({
            where: { id },
            include: { supplier: true, category: true }
        });
    }

    async updateProduct(id: string, productUpdate: ProductUpdateInput): Promise<Product> {
        
        let data: Prisma.ProductUpdateInput = {};

        const updateField = (field: keyof ProductUpdateInput, value: any) => {
            if (value !== undefined) {
                data[field] = value;
            }
        };

        updateField('name', productUpdate.name);
        updateField('typeControl', productUpdate.typeControl);
        updateField('quantity', productUpdate.quantity);
        updateField('amount', productUpdate.amount);

        if (productUpdate.typeControl || productUpdate.supplierId || productUpdate.categoryId) {

            const product = await this.prisma.product.findUnique({ where: { id }, include: { supplier: true, category: true } });

            if(productUpdate?.typeControl !== product.typeControl)
                if (productUpdate.typeControl === TypeControl.UNIT) {
                    data.amount = null;
                } else if (productUpdate.typeControl === TypeControl.WEIGHT) {
                    data.quantity = null;
                }
            
            if (productUpdate?.supplierId && (!product.supplier || product.supplierId !== productUpdate.supplierId)) {
                data.supplier = { connect: { id: productUpdate.supplierId } };
            }

            if (productUpdate?.categoryId && (!product.category || product.categoryId !== productUpdate.categoryId)) {
               data.category = { connect: { id: productUpdate.categoryId } };
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

    async validateProduct(product: ProductCreateInput | ProductUpdateInput, productId?: string) {

        if(productId){
            const product = await this.getProductById(productId);
            if(!product) {
                throw new BadRequestException('Produto não encontrado');
            }
        }

        if (product?.typeControl == TypeControl.UNIT && (product.quantity == null || product.quantity as number < 0)) {
            throw new BadRequestException('Quantidade é obrigatória quando o tipo de controle é UNIDADE');
        }
       
        if (product?.typeControl == TypeControl.WEIGHT && (product.amount == null || product.amount as number < 0)) {
            throw new BadRequestException('Peso é obrigatório quando o tipo de controle é PESO');
        }

        if(product?.supplierId) {
            const supplier = await this.supplierService.getSupplierById(product.supplierId);
            if(!supplier) {
                throw new BadRequestException('Fornecedor não encontrado');
            }
        }

        if(product?.categoryId) {
            const category = await this.categoryService.getCategoryById(product.categoryId);
            if(!category) {
                throw new BadRequestException('Categoria não encontrada');
            }
        }

    }

}