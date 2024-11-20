import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';


@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: `${60 * 60}s` },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, UserService,
        { provide: APP_GUARD, useClass: AuthGuard }
    ],
})
export class AuthModule { }