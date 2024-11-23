import { Prisma } from "@prisma/client";

export interface SupplierCreateInput extends Prisma.SupplierCreateInput {
    productsIds: string[];
}

export interface SupplierUpdateInput extends Prisma.SupplierCreateInput {
    productsIds?: string[];
}