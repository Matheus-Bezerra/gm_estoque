
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';
import { resetPasswordInput, signInInput } from './domain/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInInput: signInInput) {
    return this.authService.signIn(signInInput);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post("reset-password")
  resetPassword(@Request() req, @Body() resetPasswordInput: resetPasswordInput ) {
    console.log("req.user");
    console.log(req.user);
    return this.authService.resetPassword(req.user.id, resetPasswordInput);
  }

}
