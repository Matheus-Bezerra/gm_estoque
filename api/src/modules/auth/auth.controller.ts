import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { login } from './domain/login.interface';
import { UserNotFoundError } from './domain/userNotFoundError';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}



    @Post()
    login(@Body() params: login, @Res() res) {
        const response =  this.authService.checkLogin(params);

        if(response instanceof UserNotFoundError)
            res.status(404).send(response);

        res.status(200).send(response);

    }

}