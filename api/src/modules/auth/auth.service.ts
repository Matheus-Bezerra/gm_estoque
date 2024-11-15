import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/primsa.service';
import { login } from './domain/login.interface';
import { UserNotFoundError } from './domain/userNotFoundError';

@Injectable()
export class AuthService {

    constructor(private primsa: PrismaService) { }


    async checkLogin(input: login){
        const user = await this.primsa.user.findUnique({
            where: { email: input.email, password: input.password }
        });

        if(!user)
            throw UserNotFoundError;
    }

}