import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) {}

    @Get()
    getAllSuppliers(@Request() req) {
        return this.supplierService.getAllSuppliers(req.user.id);
    }

    @Post()
    createSupplier(@Request() req, @Body() supplier: Prisma.SupplierCreateInput) {
        return this.supplierService.createSupplier(req.user.id, supplier);
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