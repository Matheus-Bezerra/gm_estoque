import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) {}

    @Get()
    getAllSuppliers(@Param("user_id") userId: string) {
        return this.supplierService.getAllSuppliers(userId);
    }

    @Post()
    createSupplier(@Body() supplier: Prisma.SupplierCreateInput) {
        return this.supplierService.createSupplier(supplier);
    }

    @Put(':id')
    updateSupplier(@Param('id') id: string, @Body() updateSupplier: Prisma.SupplierUpdateInput) {
        return this.supplierService.updateSupplier(id, updateSupplier);
    }

    @Delete(':id')
    deleteSupplier(@Param('id') id: string) {
        return this.supplierService.deleteSupplier(id);
    }
}