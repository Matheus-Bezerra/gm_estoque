import { Prisma } from "@prisma/client";

export interface CategoryCreateInput extends Prisma.CategoryCreateInput {
    productsIds: string[];
}

export interface CategoryUpdateInput extends Prisma.CategoryCreateInput {
    productsIds?: string[];
}