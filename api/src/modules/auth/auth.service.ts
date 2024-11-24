
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Sign, hash } from 'crypto';
import { signInInput } from './domain/login.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(
    signInInput: signInInput
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(signInInput.username);
    
    if (!user) {
      throw new NotFoundException("User not found exception");
    }

    const passHash = hash('sha256', signInInput.password); 
    if (user.password !== passHash) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.name, email: user.email };
     
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
