import { Injectable } from '@nestjs/common';
import { Supplier, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierCreateInput, SupplierUpdateInput } from './domain/supplier.interface.controller';

@Injectable()
export class SupplierService {


    constructor(private prisma: PrismaService) { }


    async createSupplier(userId: string, supplier: SupplierCreateInput): Promise<Supplier> {

        let supplierCreated: Prisma.SupplierCreateArgs = {
            data: {
                name: supplier.name,
                email: supplier.email,
                user: { connect: { id: userId } }
            }, include: { products: true }
        }

        if (supplier.productsIds && supplier.productsIds.length > 0)
            supplierCreated.data.products = { connect: supplier.productsIds.map(id => ({ id })) };


        return await this.prisma.supplier.create(supplierCreated);
    }

    async getAllSuppliers(userId: string): Promise<Supplier[]> {
        return await this.prisma.supplier.findMany(
            {
                where: { user: { id: userId } },
                include: { products: true },
                orderBy: { name: 'asc' }
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

        let data: Prisma.SupplierUpdateInput = {}

        if (supplier.name) data.name = supplier.name;
        if (supplier.email) data.email = supplier.email;

        if (supplier.productsIds) {
            const productsDisassociateSuppliers = [];
            const supplierItem = await this.prisma.supplier.findUnique({ where: { id }, include: { products: true } });
            supplierItem.products.forEach(product => {
                if (!supplier.productsIds.includes(product.id)) {
                    productsDisassociateSuppliers.push({ id: product.id });
                }
            });
            const productsAssociateSuppliers = supplier.productsIds.filter(id => !supplierItem.products.map(product => product.id).includes(id));
            data.products = { disconnect: productsDisassociateSuppliers.map(id => id), connect: productsAssociateSuppliers.map(id => ({ id })) };
        }

        return await this.prisma.supplier.update({
            where: { id },
            data,
            include: { products: true }
        });
    }

    async deleteSupplier(id: string): Promise<Supplier> {
        return await this.prisma.supplier.delete({
            where: { id }
        });
    }
}