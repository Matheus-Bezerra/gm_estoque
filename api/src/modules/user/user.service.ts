import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/primsa.service';
import { hash } from 'crypto';

@Injectable()
export class UserService {


    constructor(private primsa: PrismaService) { }


    async createUser(user: Prisma.UserCreateInput): Promise<User> {
        user.password = hash('sha256', user.password);
        return await this.primsa.user.create({
            data: user
        });
    }

    async updateUser(id: string, user: Prisma.UserUpdateInput): Promise<User> {
        return await this.primsa.user.update({
            where: { id },
            data: user
        });
    }

    async deleteUser(id: string): Promise<User> {
        return await this.primsa.user.delete({
            where: { id }
        });
    }
}