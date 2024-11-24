/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { Public } from '../auth/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  createUser(@Body() user: Prisma.UserCreateInput) {
    return this.userService.createUser(user);
  }

  @Put()
  updateUser(
    @Request() req,
    @Body() updateUser: Prisma.UserUpdateInput,
  ) {
    return this.userService.updateUser(req.user.id, updateUser);
  }

  @Delete()
  deleteUser(@Request() req) {
    return this.userService.deleteUser(req.user.id);
  }
}
