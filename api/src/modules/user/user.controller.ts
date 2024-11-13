import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @Post()
    createUser(@Body() user: Prisma.UserCreateInput) {
        return this.userService.createUser(user);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUser: Prisma.UserUpdateInput) {
        return this.userService.updateUser(id, updateUser);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}