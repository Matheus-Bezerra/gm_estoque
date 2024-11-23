import { Injectable } from '@nestjs/common';
import { Supplier, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierCreateInput, SupplierUpdateInput } from './domain/supplier.interface.controller';

@Injectable()
export class SupplierService {


    constructor(private prisma: PrismaService) { }


    async createSupplier(userId: string, supplier: SupplierCreateInput): Promise<Supplier> {
        supplier.user = { connect: { id: userId } };
        supplier.products = { connect: supplier?.productsIds?.map(id => ({ id })) };

        return await this.prisma.supplier.create({
            data: supplier,
            include: { products: true }
        });
    }

    async getAllSuppliers(userId: string): Promise<Supplier[]> {
        return await this.prisma.supplier.findMany(
            {
                where: { user: { id: userId } },
                include: { products: true }
            }
        );
    }

    async getSupplierById(id: string): Promise<Supplier> {
        return await this.prisma.supplier.findUnique({
            where: { id },
            include: { products: true }
        });
    }

    async updateSupplier(id: string, supplier: SupplierUpdateInput): Promise<Supplier> {
        
        const productsDisassociateSuppliers = [];

        const supplierData = await this.prisma.supplier.findUnique({ where: { id }, include: { products: true } });

        supplierData.products.forEach(product => {
           if(!supplier.productsIds.includes(product.id)) {
               productsDisassociateSuppliers.push({ id: product.id });
           }
        });

        const productsAssociateSuppliers = supplier.productsIds.filter(id => !supplierData.products.map(product => product.id).includes(id));

        supplier.products = { connect: productsAssociateSuppliers.map(id => ({ id })) };

        return await this.prisma.supplier.update({
            where: { id },
            data: supplier
        });
    }

    async deleteSupplier(id: string): Promise<Supplier> {
        return await this.prisma.supplier.delete({
            where: { id }
        });
    }
}