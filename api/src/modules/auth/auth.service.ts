
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);
    const passHash = hash('sha256', pass);
    if (user.password !== passHash) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.name };
     
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
