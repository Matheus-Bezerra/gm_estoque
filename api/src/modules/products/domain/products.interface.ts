import { Prisma } from "@prisma/client";

export interface ProductGetAllInput {
    productsWithoutCategory?: boolean;
    productsWithoutSupplier?: boolean;    
}

export interface ProductCreateInput extends Prisma.ProductCreateInput {
    supplierId: string;
    categoryId: string;
}
export interface ProductUpdateInput extends Prisma.ProductUpdateInput {
    supplierId?: string;
    categoryId?: string;
}