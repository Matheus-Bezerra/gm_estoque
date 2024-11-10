import { Injectable } from '@nestjs/common';
import { Supplier ,Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/primsa.service';

@Injectable()
export class SupplierService {

    
    constructor(private primsa: PrismaService) { }

    
    async createSupplier(supplier: Prisma.SupplierCreateInput): Promise<Supplier> {
        return await this.primsa.supplier.create({
            data: supplier
        });
    }

    async getAllSuppliers(): Promise<Supplier[]> {
        return await this.primsa.supplier.findMany();
    }

    async updateSupplier(id: string, supplier: Prisma.SupplierUpdateInput): Promise<Supplier> {
        return await this.primsa.supplier.update({
            where: { id },
            data: supplier
        });
    }

    async deleteSupplier(id: string): Promise<Supplier> {
        return await this.primsa.supplier.delete({
            where: { id }
        });
    }
}