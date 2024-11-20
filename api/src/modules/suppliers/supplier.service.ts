import { Injectable } from '@nestjs/common';
import { Supplier, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupplierService {


    constructor(private prisma: PrismaService) { }


    async createSupplier(userId: string, supplier: Prisma.SupplierCreateInput): Promise<Supplier> {
        supplier.user = { connect: { id: userId } };
        return await this.prisma.supplier.create({
            data: supplier
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

    async updateSupplier(id: string, supplier: Prisma.SupplierUpdateInput): Promise<Supplier> {
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