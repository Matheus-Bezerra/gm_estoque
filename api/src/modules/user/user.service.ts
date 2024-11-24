import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'crypto';

@Injectable()
export class UserService {


    constructor(private prisma: PrismaService) { }


    async findOne(username: string): Promise<User | undefined> {
        return await this.prisma.user.findUnique({
            where: { name: username }
        })
    }

    async createUser(user: Prisma.UserCreateInput): Promise<User> {
        user.password = hash('sha256', user.password);
        return await this.prisma.user.create({
            data: user
        });
    }

    async updateUser(id: string, user: Prisma.UserUpdateInput): Promise<User> {
        return await this.prisma.user.update({
            where: { id },
            data: user
        });
    }

    async deleteUser(id: string): Promise<User> {
        return await this.prisma.user.delete({
            where: { id }, include: { products: true, categories: true }
        });
    }
}