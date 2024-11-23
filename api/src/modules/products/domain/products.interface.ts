import { Prisma } from "@prisma/client";

export interface Filters {
    productsWithoutCategory?: boolean;
    productsWithoutSupplier?: boolean;
}

export interface ProductGetAllInput {
    filters?: Filters;    
}

export interface ProductCreateInput extends Prisma.ProductCreateInput {
    supplierId: string;
    categoryId: string;
}
export interface ProductUpdateInput extends Prisma.ProductUpdateInput {
    supplierId?: string;
    categoryId?: string;
}